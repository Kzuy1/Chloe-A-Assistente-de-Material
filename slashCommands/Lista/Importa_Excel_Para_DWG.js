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
                        fs.unlink(path, () => reject(err));
                    });
                })
            })
        }
        await download();
        
        const result = spawn("python", ["-c", `import ${__dirname}lista`, `lista.excelToDwg()`]);

        let output = '';

        result.stdout.on('data', (data) => {
        output += data.toString();
        });

        result.stderr.on('data', (data) => {
        console.error(data.toString());
        });

        result.on('close', (code) => {
        console.log(`O processo filho foi encerrado com o código ${code}`);
        console.log(`Saída: ${output}`);
        // Aqui você pode fazer o que quiser com a variável de saída (output)
        });

        // interaction.reply({content: "Aqui está a Planilha organizada", files: [file] })

    },
};
