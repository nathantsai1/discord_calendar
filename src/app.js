require("dotenv").config();

const { REST, Routes, Client, GatewayIntentBits, SlashCommandBuilder, Partials } = require("discord.js");
const path = require('node:path');
const { get_all_info } = require('./events/NeonDB/db_work');
const fs = require("fs");
const { call } = require('./events/subs/call_events.js');
const { embedEvent } = require('./events/subs/embed.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
    
    partials: [
        // Partials.Channel,
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
                .setDescription('Your event name goes here(limit 30 characters and 5 EVENTS TOTAL)')
                .setRequired(true)
                .setMaxLength(30)
            )
        .addStringOption(option => 
            option.setName('event_date')
                .setDescription('The date and time of the event - follow format(w/ optional hour input, local time): MM-DD-YYYY HH')
                .setRequired(true)
                .setMinLength(10)
                .setMaxLength(13)
            ),
    new SlashCommandBuilder().setName('delete_event').setDescription(`Delete an event - name the format of the event`)
    .addStringOption(option => 
        option.setName('event_name')
            .setDescription('Your event name goes here')
            .setRequired(true)
            .setMaxLength(30)
        ),,
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
// client.once(Event.InteractionCreate, Event.execute(call(...args, client)));
client.login(process.env.TOKEN);

const rest = new REST().setToken(process.env.TOKEN);
// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        let x=0;
let output;
while (x < 2) {
    // let info = get_all_info();
    let info = [{id: 2,discord_user_id: '1100233829446324244',event_date: '1736836511',event_name: 'test',server_id: '786773227275026442',event_channel_id: '1224931117438861385'}]
    output = await call(info);
    if (output == output) {
        for (const z in output) {
            client.users.fetch(output[z][0], false).then((user) => { user.send({ embeds: [ embedEvent(output[z][1], output[z][2])]}); });
        }
    }
    x++;
};
console.log('done');
	} catch (error) {
		console.error(error);
	}
})()



