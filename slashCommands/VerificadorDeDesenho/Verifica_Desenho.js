const { ApplicationCommandOptionType } = require("discord.js");
const https = require("https");
const fs = require("fs");
const { spawn } = require("child_process");

module.exports = {
	name: "verifica_desenho",
	category: "Verificador de Desenho",
	description: "Este comando verifica o desenho",
	ownerOnly: false,
	options: [
		{
			name: "desenho",
			description: "Anexe o Desenho",
			type: ApplicationCommandOptionType.Attachment,
			required: true
		}
	],

	run: async (client, interaction) => {
		const attachment = interaction.options.get("desenho");
		const path = `${__dirname}/DesenhoSaves/${attachment.attachment.name}`;

		function download(){
			return new Promise((resolve, reject) => {
				https.get(attachment.attachment.url,(res) => {
					const filePath = fs.createWriteStream(path);
					res.pipe(filePath);
					filePath.on("finish",() => {
						filePath.close();
						resolve();
					});
					filePath.on("error", (err) => {
						fs.unlink(path, () => reject(err));
					});
				});
			});
		}
		await download();

		const pythonProcess = spawn("python", [`${__dirname}/verificador.py`, path]);
        
		for await (const data of pythonProcess.stdout) {
			const file = data.toString().trim();
			console.log(file);
			// interaction.channel.send({content: `<@${interaction.user.id}>Aqui está os arquivos`, files: [file]})
		}

	},
};
