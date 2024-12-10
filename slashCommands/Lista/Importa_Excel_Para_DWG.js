const { ApplicationCommandOptionType } = require('discord.js');
const https = require('https');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const FormData = require('form-data');

module.exports = {
  name: 'importa_excel_para_dwg',
  category: 'Lista de Material',
  description: 'Este comando converte os dados da planilha para o DWG',
  ownerOnly: false,
  options: [
    {
      name: 'planilha',
      description: 'Anexe a Planilha',
      type: ApplicationCommandOptionType.Attachment,
      required: true
    }
  ],

  run: async (client, interaction) => {
    const optionSheet = interaction.options.get('planilha');
    const attachment = optionSheet.attachment;
    const filePath = path.resolve(__dirname, 'download', attachment.name);

    // Verifica se a extensão do arquivo é .xlsx
    if (!attachment || !attachment.name.toLowerCase().endsWith('.xlsx')) {
      return interaction.channel.send(
        `<@${interaction.user.id}>, envie apenas arquivo .xlsx`
      );
    }

    // Função para baixar o arquivo
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
    await downloadFile(attachment.url, filePath);

    async function apiRequest(){
      try {
        const fileContent = fs.readFileSync(filePath);
        const formData = new FormData();
        formData.append('file', fileContent, attachment.name);
                
        // Esperar a resposta do servidor antes de prosseguir
        const response = await axios.post('https://chloeape.discloud.app:443/upload', formData, {
          headers: formData.getHeaders(), 
          responseType: 'arraybuffer',
        });
                
        const filename = response.headers['content-disposition'].split('filename=')[1].replace(/"/g, '').trim();
        const responsePath = path.resolve(__dirname, 'download', filename);
        fs.writeFileSync(responsePath, response.data);
        await interaction.channel.send({
          content: `<@${interaction.user.id}>, aqui está o arquivo:`, 
          files: [responsePath]
        });

        // Deleta os Arquivos
        fs.unlinkSync(responsePath);
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Erro:', error.message);
        interaction.channel.send(`<@${interaction.user.id}>, ocorreu um erro ao processar a planilha.\nErro: ${error.message}`);
      }
    }
    await apiRequest();
        
  },
};
