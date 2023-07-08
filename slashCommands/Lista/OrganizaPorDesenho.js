const { ApplicationCommandOptionType } = require('discord.js');
const { automatizePecas }  = require("./Reformulador EU/automatizePecas.js")
const https = require('https');
const fs = require('fs');

module.exports = {
    name: "organiza_por_desenho",
    category: "Lista de Material",
    description: "Este comando separa as informações da planilha por desenho",
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

        const file = await automatizePecas(path)
        interaction.channel.send({content: "Aqui está a Planilha organizada", files: [file] })

    },
};
