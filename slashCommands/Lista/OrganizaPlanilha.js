const { ApplicationCommandOptionType } = require('discord.js');
const { automatize }  = require('./Reformulador EU/automatize.js');
const https = require('https');
const path = require('path');
const fs = require('fs');

module.exports = {
  name: 'organiza_planilha',
  category: 'Lista de Material',
  description: 'Este comando organiza a planilha extraída do modelo e realiza verificações',
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
      const file = await automatize(filePath);

      // Retorna o Arquivo para Usuário
      await interaction.channel.send({
        content: `<@${interaction.user.id}>, aqui está a planilha organizada:\n${file[0]}`, 
        files: [file[1]] 
      });

      // Deleta o Novo arquivo
      fs.unlinkSync(file[1]);
    } catch (error) {
      console.error('Erro:', error.message);
      interaction.channel.send(`<@${interaction.user.id}>, ocorreu um erro ao processar a planilha.\nErro: ${error.message}`);
    }

    // Remove o arquivo temporário
    fs.unlinkSync(filePath);
  },
};
