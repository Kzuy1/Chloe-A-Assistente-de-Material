const { ApplicationCommandOptionType } = require('discord.js');
const { post } = require('axios');
const https = require('https');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

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
    const fileNameWithoutExtension = attachment.name.replace('.dxf', '');
    const filePath = path.resolve(__dirname, 'download', attachment.name);

    // Verifica se a extensão do arquivo é .dxf
    if (!attachment || !attachment.name.toLowerCase().endsWith('.dxf')) {
      return interaction.channel.send(
        `<@${interaction.user.id}>, envie apenas arquivo .dxf`
      );
    }

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

    // Função para enviar para API verificar e retornar
    try {
      const fileContent = fs.readFileSync(filePath);
      const formData = new FormData();
      formData.append('file', fileContent, attachment.name);
      formData.append('data', dataValue);

      // Usar o await para esperar a resposta do servidor antes de prosseguir
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

      // Apaga o arquivo dxf
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error.message);
      return interaction.channel.send(`<@${interaction.user.id}>, ocorreu um erro ao verificar o desenho.\nErro: ${error.message}`);
    }
  },
};
