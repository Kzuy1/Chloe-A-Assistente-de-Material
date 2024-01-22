const { ApplicationCommandOptionType } = require('discord.js');
const { get } = require('https');
const { createWriteStream, readFileSync, unlink } = require('fs');
const { post } = require('axios');
const FormData = require('form-data');

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
  ],

  run: async (client, interaction) => {
    const attachment = interaction.options.get('desenho');
    const path = `${__dirname}/drawingSaves/${attachment.attachment.name}`;

    // Verifica se a extensão do arquivo é .dxf
    const isDxfFile = path.toLowerCase().endsWith('.dxf');

    if (!isDxfFile) {
      return interaction.channel.send(`<@${interaction.user.id}>, envie apenas arquivo .dxf`);
    }

    function download() {
      return new Promise((resolve, reject) => {
        get(attachment.attachment.url, (res) => {
          const filePath = createWriteStream(path);
          res.pipe(filePath);

          filePath.on('finish', () => {
            filePath.close();
            resolve();
          });

          filePath.on('error', (err) => {
            unlink(path, () => reject(err));
          });
        });
      });
    }
    await download();

    // Função para enviar para API verificar e retornar
    try {
      const fileContent = readFileSync(path);
      const formData = new FormData();
      formData.append('file', fileContent, path.match(/\/([^/]+)$/)[0]);

      // Usar o await para esperar a resposta do servidor antes de prosseguir
      const response = await post('https://chloeape.discloud.app:443/verify', formData, {
        headers: formData.getHeaders(),
      });

      return interaction.channel.send({ content: `<@${interaction.user.id}>, aqui erros:\n${response.data}` });
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error.message);
      return interaction.channel.send(`<@${interaction.user.id}>, ocorreu um erro ao verificar o desenho.`);
    }
  },
};
