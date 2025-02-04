require("dotenv").config();

const { REST, Routes, Client, GatewayIntentBits, SlashCommandBuilder, Partials } = require("discord.js");
const path = require('node:path');
const fs = require("fs");

const keepAlive = require('./events/subs/keepalive.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
    
    partials: [
        Partials.Message
    ]
});
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter((file)=>file.endsWith(".js"));
const commands = [
    new SlashCommandBuilder().setName('add_event').setDescription(`you set event and time/date of event, 
        Scratch will tell/remind you time to date/event`)
        .addStringOption(option => 
            option.setName('event_name')
                .setDescription('Your event name goes here(limit 30 characters and 10 EVENTS TOTAL)')
                .setRequired(true)
                .setMaxLength(30)
            )
        .addStringOption(option => 
            option.setName('event_date')
                .setDescription('The date and time of the event - follow format(w/ optional hour input, GMT time): MM-DD-YYYY HH')
                .setRequired(true)
                .setMinLength(10)
                .setMaxLength(13)
            ),
    new SlashCommandBuilder().setName('delete_event').setDescription(`Delete an event`)
    .addStringOption(option => 
        option.setName('event_name')
            .setDescription('Your event name goes here')
            .setRequired(true)
            .setMaxLength(30)
        ), 
    new SlashCommandBuilder().setName('list_events').setDescription(`List all of your events`),
];
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN);

const rest = new REST().setToken(process.env.TOKEN);

// deploy the commands
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
        
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);
    
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})()



