require("dotenv").config();

const { get_info } = require('./NeonDB/db_work');
const { Events } = require("discord.js");
const { embedList } = require('./subs/embed');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (interaction.commandName == "list_events") {
            console.log('working on /list_events')
            const get_events = await get_info(interaction.user.id);
            
            // send events
            if (get_events.length == 0) {
                interaction.reply({ embeds: [ embedList([{name: 'None', value: "```There seems to be no events with user '" + interaction.user.globalName + "'```"}])], ephemeral: true });
                
            } else {
                let list = [];
                let dates;
                for (let i = 0; i < get_events.length; i++) {
                    dates = new Date(Number(get_events[i].event_date)).toString();
                    list.push({name: get_events[i].event_name, value: dates });
                }

                interaction.reply({ embeds: [ embedList(list)], ephemeral: true });
            }
        }
    }
}