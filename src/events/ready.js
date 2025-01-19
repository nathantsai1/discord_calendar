const { Events, ActivityType } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client){
        const commands = [
            new SlashCommandBuilder().setName('add_event').setDescription(`you set event, time/date of event, 
                we remind you time to date/event`)
                .addStringOption(option => 
                    option.setName('event_name')
                        .setDescription('Your event name goes here(limit 30 characters and 10 EVENTS TOTAL)')
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
                ), 
            new SlashCommandBuilder().setName('list_events').setDescription(`List all of your events`),
        ];
        console.log(`Ready! logged in as ${client.user.tag}`)
        if (client.application) {
            client.application.commands.set(commands);
        };
        client.user.setActivity({
            name: "with me 🤤",
            type: ActivityType.Playing,
        })
    }   
}