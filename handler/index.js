const fs = require('fs');
const { connect } = require('mongoose');

//Carregar eventos
const loadEvents = async function (client) {
  const eventFolders = fs.readdirSync('./events');
  for (const folder of eventFolders) {
    const eventFiles = fs
      .readdirSync(`./events/${folder}`)
      .filter((file) => file.endsWith('.js'));
        
    for (const file of eventFiles) {
      const event = require(`../events/${folder}/${file}`);
            
      if (event.name) {
        console.log(` ✔️  => Evento ${file} carregado.`);
      } else {
        console.log(` ❌ => Evento ${file} falta um help.name ou help.name não está na string.`);
        continue;
      }
            
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  }
};

//Carregar slashcommands
const loadSlashCommands = async function (client) {
  let slash = [];

  const commandFolders = fs.readdirSync('./slashCommands');
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./slashCommands/${folder}`)
      .filter((file) => file.endsWith('.js'));
        
    for (const file of commandFiles) {
      const command = require(`../slashCommands/${folder}/${file}`);
            
      if (command.name) {
        client.slash.set(command.name, command);
        slash.push(command);
        console.log(` ✔️  => slashcommand ${file} carregado.`);
      } else {
        console.log(` ❌ => slashcommand ${file} falta um help.name ou help.name não está na string.`);
        continue;
      }
    }
  }

  client.on('clientReady', async() => {
    await client.application.commands.set(slash);
  });
};

//Conecta ao Banco de Dados
const loadDateBase = async function (mongoUrl){
  try {
    await connect(mongoUrl);
    console.log(' ✔️  => Conexão bem-sucedida com o banco de dados!');
  } catch (error) {
    console.error(' ❌ => Erro ao conectar ao banco de dados!', error);
  }
};

module.exports = {
  loadEvents,
  loadSlashCommands,
  loadDateBase
};
