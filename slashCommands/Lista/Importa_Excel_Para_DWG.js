const { ApplicationCommandOptionType } = require('discord.js');
const https = require('https');
const fs = require('fs');
const { spawn } = require('child_process');

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

        const pythonProcess = spawn('python', [`${__dirname}/ExcelToDwg/lista.py`, path]);
        
        for await (const data of pythonProcess.stdout) {
            const file = data.toString().trim();
            interaction.channel.send({content: `<@${interaction.user.id}>Aqui está os arquivos`, files: [file]})
          };
        

    },
};
