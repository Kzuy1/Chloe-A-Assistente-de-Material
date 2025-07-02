const { Client, Collection, Partials, GatewayIntentBits} = require("discord.js");
const config = require("./config.json");
const handler = require("./handler/index");
const process = require("node:process");
const myIntents = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildEmojisAndStickers,
	GatewayIntentBits.GuildIntegrations,
	GatewayIntentBits.GuildWebhooks,
	GatewayIntentBits.GuildInvites,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildMessageTyping,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.DirectMessageReactions,
	GatewayIntentBits.DirectMessageTyping,
	GatewayIntentBits.MessageContent
];

const myPartials = [
	Partials.Channel,
	Partials.Message,
	Partials.Reaction
];
const client = new Client({
	partials: myPartials,
	intents: myIntents
});

const Discord = require("discord.js");

module.exports = client;

client.discord = Discord;
client.commands = new Collection();
client.slash = new Collection();
client.config = require("./config");

// Carregar comando, eventos e DataBase
handler.loadEvents(client);
handler.loadSlashCommands(client);
//handler.loadDateBase(config.mongoUrl);

// Erro no Handling
process.on("uncaughtException", (err) => {
	console.log("Uncaught Exception: " + err);
});
  
process.on("unhandledRejection", (reason, promise) => {
	console.log("[GRAVE] Rejeição possivelmente não tratada em: Promise ", promise, " motivo: ", reason.message);
});

client.login(config.token);