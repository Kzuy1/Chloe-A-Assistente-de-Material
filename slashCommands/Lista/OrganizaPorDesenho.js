const { ApplicationCommandOptionType } = require('discord.js');
const { automatizePecas }  = require('./Reformulador EU/automatizePecas.js');
const https = require('https');
const path = require('path');
const fs = require('fs');

module.exports = {
  name: 'organiza_por_desenho',
  category: 'Lista de Material',
  description: 'Este comando separa as informações da planilha por desenho',
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

    try{
      // Processa o Arquivo
      const file = await automatizePecas(filePath);

      // Retorna o Arquivo para Usuário
      await interaction.channel.send({
        content: `<@${interaction.user.id}>, aqui está a planilha organizada por desenho\n${file[0]}`,
        files: [file[1]] 
      });
    } catch (error) {
      console.error('Erro:', error.message);
      interaction.channel.send(`<@${interaction.user.id}>, ocorreu um erro ao processar a planilha.\nErro: ${error.message}`);
    }

    // Remove o arquivo temporário
    fs.unlinkSync(filePath);
  },
};
