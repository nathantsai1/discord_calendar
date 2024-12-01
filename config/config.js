const { REST, Routes,ApplicationCommandOptionType } = require('discord.js');

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

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
      console.log('Started refreshing SLASH (/) commands.');
      await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: commands }
      );
      console.log('Successfully reloaded SLASH (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();