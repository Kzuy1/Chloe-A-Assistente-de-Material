const { ApplicationCommandOptionType } = require('discord.js');
const { post } = require('axios');
const https = require('https');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const AdmZip = require('adm-zip');
const xlsx = require('xlsx');

function downloadFile(url, destinationPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destinationPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(destinationPath, () => reject(err));
    });
  });
}

function extractZip(filePath, outputDir) {
  const zip = new AdmZip(filePath);
  zip.extractAllTo(outputDir, true);
}

function deleteFiles(files) {
  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
}

async function sendFilesToAPI(zipPath, xlsxPath) {
  const zipContent = fs.readFileSync(zipPath);
  const xlsxContent = fs.readFileSync(xlsxPath);
  const zipName = path.basename(zipPath);
  const xlsxName = path.basename(xlsxPath);

  const formData = new FormData();
  formData.append('zip', zipContent, zipName);
  formData.append('xlsx', xlsxContent, xlsxName);

  const response = await post('https://chloeape.discloud.app:443/add-attributes', formData, {
    headers: formData.getHeaders(),
    responseType: 'arraybuffer',
  });

  return response.data;
}

async function processFiles(folderPath, zipLength, interaction) {
  const errors = [];
  const files = fs.readdirSync(folderPath);
  const xlsxFile = files.find(file => file.toLowerCase().endsWith('.xlsx'));

  const workBook = xlsx.readFile(path.join(folderPath, xlsxFile));
  const sheet = workBook.Sheets[workBook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  let notErrors = true;

  if (data.length === 0) {
    await interaction.followUp(
      `<@${interaction.user.id}>, a planilha enviada está vazia.`
    );
    notErrors = false;
    return notErrors;
  }

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const partName = row['PartName'];
    const thickness = row['Thickness'];
    const material = row['Material'];
    const quantity = row['Quantity'];

    if (!partName || !thickness || !material || !quantity) {
      errors.push(`:lady_beetle: Linha ${i + 2}: possui campos vazios.`);
      notErrors = false;
    }

    const dxfPath = path.join(folderPath, `${partName}.dxf`);

    if (!fs.existsSync(dxfPath)) {
      errors.push(`:lady_beetle: Linha ${i + 2}: Arquivo **${partName}.dxf** não foi encontrado.`);
    }
  }

  if (zipLength > data.length) { // pra ver se tem mais arquivos no zip do que no xlsx.
    if (data.length == 0) {
      errors.push(`:lady_beetle: O arquivo .zip contém ${zipLength} arquivo(s), mas o .xlsx está vazio.`);
    }
    else {
      errors.push(`:lady_beetle: O arquivo .zip contém ${zipLength} arquivo(s), mas o .xlsx possui apenas ${data.length} registro(s).`);
    }
    notErrors = false;
  }

  if (data.length > zipLength) {
    if (zipLength == 0) {
      errors.push(`:lady_beetle: O arquivo .xlsx contém ${data.length} registro(s), mas o .zip está vazio.`);
    }
    else {
      errors.push(`:lady_beetle: O arquivo .xlsx contém ${data.length} registro(s), mas o .zip possui apenas ${zipLength} arquivo(s).`);
    }
    notErrors = false;
  }

  if (errors.length > 0) {
    await interaction.followUp(
      `<@${interaction.user.id}>, foram encontrados os seguintes problemas:\n\n` +
      errors.join('\n')
    );
    notErrors = false;
  }

  return notErrors;
}

module.exports = {
  name: 'importa_atributos_peca_para_dxf',
  description: 'Recebe a planilha (.xlsx) e modelo (.dxf ou .zip) para gerar DXFs com atributos.',
  options: [
    {
      name: 'spreadsheet',
      description: 'Anexe a planilha (.xlsx)',
      type: ApplicationCommandOptionType.Attachment,
      required: true,
    },
    {
      name: 'part',
      description: 'Anexe o modelo (.dxf ou .zip)',
      type: ApplicationCommandOptionType.Attachment,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const spreadsheet = interaction.options.get('spreadsheet').attachment;
    const model = interaction.options.get('part').attachment;
    const spreadsheetName = spreadsheet.name;
    const modelName = model.name;

    const outputFolder = path.resolve(__dirname, 'download');
    const spreadsheetPath = path.resolve(__dirname, 'download', spreadsheetName);
    let modelPath = path.resolve(__dirname, 'download', modelName);
    let dxfTempZipPath = null;
    let originalDxfPath = null;

    await interaction.deferReply(); // pra aparecer q o bot ta pensando e n dar aquele aviso de erro de interacao

    // Verifica se a extensão do Arg1 é .xlsx
    if (!spreadsheet || (!spreadsheetName.toLowerCase().endsWith('.xlsx'))) {
      return interaction.followUp(
        `<@${interaction.user.id}>, o anexo 1 deve ser .xlsx.`
      );
    }

    // Verifica se a extensão do Arg2 é .zip ou .dxf
    if (!model || (!modelName.toLowerCase().endsWith('.dxf') && !modelName.toLowerCase().endsWith('.zip'))) {
      return interaction.followUp(
        `<@${interaction.user.id}>, o anexo 2 deve ser .dxf ou .zip.`
      );
    }

    // Baixando os dois anexos
    await downloadFile(spreadsheet.url, spreadsheetPath);
    await downloadFile(model.url, modelPath);

    try {
      let extractedFiles = [];
      let zipLength = 0;

      if (modelName.toLowerCase().endsWith('.zip')) { // Verifica se o Arg2 é .zip. Se for, prossegue no if

        // Variaveis pra parte dos arquivos
        const zip = new AdmZip(modelPath);
        const zipEntries = zip.getEntries();

        zipLength = zipEntries.length;

        const notDXF = zipEntries.filter(entry => // Percorre o .zip procurando se tem alguma coisa que nao é .dxf, se tiver, atribui a variavel notDXF 
          !entry.isDirectory && !entry.entryName.toLowerCase().endsWith('.dxf')
        );

        if (zipLength == 0) { // pra ver se o zip está vazio
          await interaction.followUp(
            `<@${interaction.user.id}>, o arquivo .zip enviado está vazio.`);

          fs.existsSync(spreadsheetPath) && fs.unlinkSync(spreadsheetPath);
          fs.existsSync(modelPath) && fs.unlinkSync(modelPath);
          return;
        }

        if (notDXF.length > 0) { // Se notDXF tem alguma coisa, dai avisa pro usuário
          await interaction.followUp(
            `<@${interaction.user.id}>, envie apenas zip com .dxf dentro.`);

          fs.existsSync(spreadsheetPath) && fs.unlinkSync(spreadsheetPath);
          fs.existsSync(modelPath) && fs.unlinkSync(modelPath);
          return;
        }

        extractedFiles = zipEntries.map(entry =>
          path.resolve(__dirname, 'download', entry.entryName)
        );

        fs.mkdirSync(outputFolder, { recursive: true }); // p criar a pasta /download se ela n existir
        extractZip(modelPath, outputFolder);
      }

      const valid = await processFiles(outputFolder, zipLength, interaction);

      if (!valid) {
        deleteFiles(extractedFiles);
        fs.existsSync(spreadsheetPath) && fs.unlinkSync(spreadsheetPath);
        fs.existsSync(modelPath) && fs.unlinkSync(modelPath);
        return;
      }

      if (modelName.toLowerCase().endsWith('.dxf')) {
        originalDxfPath = modelPath; // salvando o .dxf original

        dxfTempZipPath = path.resolve(__dirname, 'download', modelName.replace(/\.dxf$/i, '.zip'));

        const zip = new AdmZip();
        zip.addLocalFile(modelPath); // ainda é o .dxf 
        zip.writeZip(dxfTempZipPath);

        modelPath = dxfTempZipPath;
      }

      try {
        const response = await sendFilesToAPI(modelPath, spreadsheetPath);

        const outputZipPath = path.resolve(__dirname, 'download', 'RESULTADO.zip');
        fs.writeFileSync(outputZipPath, response);

        await interaction.followUp({
          content: `<@${interaction.user.id}>, aqui está o resultado:`,
          files: [outputZipPath],
        });

        fs.existsSync(outputZipPath) && fs.unlinkSync(outputZipPath);

      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error.message);
        await interaction.followUp(
          `<@${interaction.user.id}>, ocorreu um erro ao verificar os arquivos.\nErro: ${error.message}`
        );
      }

      deleteFiles(extractedFiles);
      fs.existsSync(spreadsheetPath) && fs.unlinkSync(spreadsheetPath);
      fs.existsSync(modelPath) && fs.unlinkSync(modelPath);
      fs.existsSync(originalDxfPath) && fs.unlinkSync(originalDxfPath);

    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error.message);
      return interaction.followUp(
        `<@${interaction.user.id}>, ocorreu um erro no processamento dos arquivos.\nErro: ${error.message}`
      );
    }

  }
};