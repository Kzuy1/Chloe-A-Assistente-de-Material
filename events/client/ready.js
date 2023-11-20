module.exports = {
	name: "ready",
	once: true,

	async execute(client) {
		console.log(`${client.user.tag} online em ${client.guilds.cache.size} servidores com ${client.users.cache.size} usuários.`);
	}
};
