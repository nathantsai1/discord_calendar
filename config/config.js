const { REST, Routes, ApplicationCommandOptionType, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'schedule',
        description:
            "Type in a date and this bot will remind you of that date's time",
        options: [
            {
                name: 'date(use in form: YYYY-MM-DD',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'event name',
                description: 'what shall the timer be called?',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
];
console.log(process.env.DISCORD_TOKEN);
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const prefix = '!';

(async () => {
    try {
      console.log('Started refreshing SLASH (/) commands.');
      const data = await rest.put(
        Routes.applicationGuildCommands( process.env.APP_ID, process.env.GUILD_ID ),
        { body: commands }
      );
      console.log('Successfully reloaded SLASH (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();

const botIntents = [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages];
module.exports = { botIntents, prefix, commands };