const { get_info } = require('./NeonDB/db_work');
const { Events } = require("discord.js");
const { embedList, embedWarning } = require('./subs/embed');

require("dotenv").config();

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (interaction.commandName == "list_events") {
            console.log('working on /list_events')
            const get_events = await get_info(interaction.user.id);
            
            // send events
            if (get_events.length == 0) {
                interaction.reply({ embeds: [], ephemeral: true });
            }
        }
    }
}