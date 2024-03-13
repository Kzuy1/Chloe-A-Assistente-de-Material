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
    {
      name: 'data',
      description: 'Especifique a data de emissão do desenho. Exemplo: 04/06/24',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const attachment = interaction.options.get('desenho');
    const fileNameWithoutExtension = attachment.attachment.name.replace('.dxf', '');
    const path = `${__dirname}/drawingSaves/${attachment.attachment.name}`;

    // Verifica a opção 'data' se estiver presente caso não coloca a Data de Hoje
    const dataOption = interaction.options.get('data');
    let dataValue;
    if (dataOption) {
      dataValue = dataOption.value;
    
      // Expressão regular para validar o formato dd/mm/yy
      const dateRegex = /^\d{2}\/\d{2}\/\d{2}$/;
    
      // Verifica se a data tem o formato correto
      if (!dateRegex.test(dataValue)) {
        return interaction.channel.send(`<@${interaction.user.id}>, a data especificada não está no formato correto. Por favor, insira uma data válida no formato dd/mm/yy.`);
      }
    } else {
      // Se nenhum valor foi fornecido para o parâmetro 'data', obtenha a data atual
      const currentDate = new Date();
      
      // Formata a data atual para o formato dd/mm/yy
      dataValue = currentDate.toLocaleDateString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: '2-digit' });
    }
    

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
      formData.append('data', dataValue);

      // Usar o await para esperar a resposta do servidor antes de prosseguir
      // 'http://127.0.0.1:5000/verify'
      const response = await post('https://chloeape.discloud.app:443/verify', formData, {
        headers: formData.getHeaders(),
      });
      
      // Se o arquivo não tenha nenhum erro
      if(response.data[0].trim() === ''){
        return interaction.channel.send({ content: `<@${interaction.user.id}>, o arquivo ${fileNameWithoutExtension} não possui erros!` });
      }

      // Se o arquivo tiver erros manda um mensagem e os erros
      interaction.channel.send({ content: `<@${interaction.user.id}>, segue abaixo a lista de erros do arquivo ${fileNameWithoutExtension};` });
      response.data.forEach(errorMessage => {
        interaction.channel.send({ content: errorMessage });
      });
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error.message);
      return interaction.channel.send(`<@${interaction.user.id}>, ocorreu um erro ao verificar o desenho. Código do erro: ${error.code}`);
    }
  },
};
