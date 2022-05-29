const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');
const config =  require('./config.json');

// Refresh Slash Commands

let commands = {};
const commanddir = path.join(__dirname, './commands');
readdirSync(commanddir).filter(str => str.endsWith('.command.js')).forEach(file => {
    const command = require(path.join(commanddir, file));
    console.log(`Found command "${command.meta.name}" at ${file}`);
    commands[command.meta.name] = command;
});

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
  try {
    console.log('Started refreshing application commands.');

    await rest.put(
      Routes.applicationGuildCommands(config.appid, config.guildid),
      { body: Object.values(commands).map(command => command.meta) },
    );

    console.log('Successfully refreshed application commands.');
  } catch (error) {
    console.error(error);
  }
})();

// Login as Bot

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    let command;
    if(command = commands[interaction.commandName]) {
        command.entry_point(interaction);
    }
});

client.login(config.token);
