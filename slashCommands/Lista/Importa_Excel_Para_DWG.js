const { ApplicationCommandOptionType } = require('discord.js');
const https = require('https');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

module.exports = {
    name: "importa_excel_para_dwg",
    category: "Lista de Material",
    description: "Este comando converte os dados da planilha para o DWG",
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
        const attachment = interaction.options.get("planilha");
        const path = `${__dirname}/PlanilhasSaves/${attachment.attachment.name}`;

        function download(){
            return new Promise((resolve, reject) => {
                https.get(attachment.attachment.url,(res) => {
                    const filePath = fs.createWriteStream(path);
                    res.pipe(filePath);
                    filePath.on('finish',() => {
                        filePath.close();
                        resolve();
                    })
                    filePath.on('error', (err) => {
                        console.log(err)
                        fs.unlink(path, () => reject(err));
                    });
                })
            })
        }
        await download();

        async function apiRequest(){
            try {
                const fileContent = fs.readFileSync(path);
                const formData = new FormData();
                formData.append('file', fileContent, path.match(/\/([^/]+)$/)[0]);
                
                // Usar o await para esperar a resposta do servidor antes de prosseguir
                const response = await axios.post('https://chloeape.discloud.app:443/upload', formData, {
                    headers: formData.getHeaders(), 
                    responseType: 'arraybuffer',
                });
                
                const filename = response.headers['content-disposition'].split('filename=')[1].replace(/"/g, '').trim();
                const responsePath = `${__dirname}/BlockList/${filename}`;
                fs.writeFileSync(responsePath, response.data);
                interaction.channel.send({content: `<@${interaction.user.id}>, aqui está os arquivos`, files: [responsePath]})
            } catch (error) {
                console.error('Erro ao enviar o arquivo:', error.message);
            }
        }
        await apiRequest();
        
    },
};
