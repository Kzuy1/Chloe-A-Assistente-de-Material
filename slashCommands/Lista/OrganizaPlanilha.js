const { ApplicationCommandOptionType } = require('discord.js');
const { automatize }  = require("./Reformulador EU/automatize.js")
const https = require('https');
const fs = require('fs');

module.exports = {
    name: "organiza_planilha",
    category: "Lista de Material",
    description: "Este comando organiza a planilha extraída do modelo e realiza verificações",
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

        const file = await automatize(path)
        interaction.channel.send({content: `Aqui está a Planilha organizada\n${file[0]}`, files: [file[1]] })

    },
};
