const { ApplicationCommandOptionType } = require('discord.js');
const { post } = require('axios');
const https = require('https');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const AdmZip = require('adm-zip');

function downloadFile(url, path) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(path, () => reject(err));
    });
  });
}

async function sendFileToVerify(filePath, issueOrRevisionDate) {
  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const formData = new FormData();
  formData.append('file', fileContent, fileName);
  formData.append('data', issueOrRevisionDate);

  const response = await post('https://chloeape.discloud.app:443/verify', formData, {
    headers: formData.getHeaders(),
  });

  return response.data;
}

function extractZip(filePath, outputDir) {
  const zip = new AdmZip(filePath);
  zip.extractAllTo(outputDir, true);
}

async function processDxfFiles(folderPath, issueOrRevisionDate, interaction) {
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    if (file.toLowerCase().endsWith('.dxf')) {
      const filePath = path.join(folderPath, file);
      const fileNameWithoutExtension = path.basename(file, '.dxf');

      try {
        const drawingErrors = await sendFileToVerify(filePath, issueOrRevisionDate);

        if (drawingErrors.length === 0) {
          await interaction.channel.send({ content: `<@${interaction.user.id}>, o arquivo ${fileNameWithoutExtension} não possui erros!` });
        } else {
          await interaction.channel.send({ content: `<@${interaction.user.id}>, segue abaixo a lista de erros do arquivo ${fileNameWithoutExtension}:` });
          drawingErrors.forEach(errorMessage => {
            interaction.channel.send({ content: errorMessage });
          });
        }

        fs.existsSync(filePath) && fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error.message);
        await interaction.channel.send(`<@${interaction.user.id}>, ocorreu um erro ao verificar o desenho ${fileNameWithoutExtension}.\nErro: ${error.message}`);
      }
    }
  }
}

module.exports = {
  name: 'verifica_desenho',
  category: 'Verificador de Desenho',
  description: 'Este comando verifica o desenho',
  ownerOnly: false,
  options: [
    {
      name: 'desenho',
      description: 'Anexe o Desenho',
      type: ApplicationCommandOptionType.Attachment,
      required: true,
    },
    {
      name: 'data',
      description: 'Especifique a data de emissão do desenho. Exemplo: 04/06/24',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const optionDrawing = interaction.options.get('desenho');
    const attachment = optionDrawing.attachment;
    const fileName = attachment.name;
    const outputFolder = path.resolve(__dirname, 'download');
    const filePath = path.resolve(__dirname, 'download', fileName);
    
    // Verifica se a extensão do arquivo é .dxf
    if (!attachment || (!fileName.toLowerCase().endsWith('.dxf') && !fileName.toLowerCase().endsWith('.zip'))) {
      return interaction.channel.send(
        `<@${interaction.user.id}>, envie apenas arquivo .dxf ou .zip.`
      );
    }

    // Verifica a opção 'data' se estiver presente caso não coloca a Data de Hoje
    const dataOption = interaction.options.get('data');
    let issueOrRevisionDate;
    if (dataOption) {
      issueOrRevisionDate = dataOption.value;
    
      // Expressão regular para validar o formato dd/mm/yy
      const dateRegex = /^\d{2}\/\d{2}\/\d{2}$/;
    
      // Verifica se a data tem o formato correto
      if (!dateRegex.test(issueOrRevisionDate)) {
        return interaction.channel.send(`<@${interaction.user.id}>, a data especificada não está no formato correto. Por favor, insira uma data válida no formato dd/mm/yy.`);
      }
    } else {
      // Se nenhum valor foi fornecido para o parâmetro 'data', obtenha a data atual
      const currentDate = new Date();
      
      // Formata a data atual para o formato dd/mm/yy
      issueOrRevisionDate = currentDate.toLocaleDateString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: '2-digit' });
    }

    await downloadFile(attachment.url, filePath);

    try {
      if (fileName.toLowerCase().endsWith('.zip')) {
        fs.mkdirSync(outputFolder, { recursive: true });
  
        extractZip(filePath, outputFolder);
      }

      await processDxfFiles(outputFolder, issueOrRevisionDate, interaction);

      // Apaga o arquivo baixado
      fs.existsSync(filePath) && fs.unlinkSync(filePath);
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error.message);
      return interaction.channel.send(`<@${interaction.user.id}>, ocorreu um erro ao verificar o desenho.\nErro: ${error.message}`);
    }
  },
};
