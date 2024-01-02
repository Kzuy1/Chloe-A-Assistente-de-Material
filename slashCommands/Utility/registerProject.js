const { ApplicationCommandOptionType } = require("discord.js");
const project = require("../../dataBaseSchema/projectSchema");

module.exports = {
	name: "cadastra_projeto",
	category: "Utilidades",
	description: "Este comando cadastra informações do projeto no Banco de Dados",
	ownerOnly: false,
	options: [
		{
			name: "codigo",
			description: "Codigo do Projeto",
			type: ApplicationCommandOptionType.String,
			required: true
		},
		{
			name: "nome",
			description: "Nome do Projeto",
			type: ApplicationCommandOptionType.String,
			required: true
		},
		{
			name: "padrao",
			description: "Padrão de Material do Projeto",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "Brasil", value: "brazil" },
				{ name: "Europa", value: "europe" },
				{ name: "América", value: "america"}
			]
		}
	],

	run: async (client, interaction) => {
		// Extrair valores das opções
		const cod = interaction.options.getString("codigo");
		const name = interaction.options.getString("nome");
		const standard = interaction.options.getString("padrao");

		// Criar um novo projeto usando os valores extraídos
		const newProject = new project({
			cod: cod,
			name: name,
			standard: standard
		});
        
		// Salva no banco de dados as informações do novo projeto
		try {
			await newProject.save();
			interaction.reply({ content: `:white_check_mark: => Projeto ${cod} - ${name} cadastrado com sucesso!` });
		} catch (error) {
			interaction.reply({ content: "❌ => Erro ao salvar o projeto no Banco de Dados!" });
			console.error("❌ => Erro ao salvar o projeto no Banco de Dados:", error);
		}
	},
};
