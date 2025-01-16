const { delete_info } = require('./NeonDB/db_work');
const { Events } = require("discord.js");
const { make_string } = require('./subs/embed');

require("dotenv").config();

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (interaction.commandName == "delete_event") {
            console.log('working on /delete_event')
            const eventName = interaction.options.getString('event_name');
            // console.log(eventName, interaction.user.id.toString());
            const is_true = await delete_info(interaction.user.id);
            // error handling
            console.log(is_true);
            if (is_true == 1) {
                interaction.reply(`Success! <@${interaction.user.id}> has deleted event: "${eventName}"`);
                interaction.user.send(`Success! <@${interaction.user.id}> has deleted event "${eventName}"`);
                return true;
            } else {
                let strings = make_string(`602 DB error: The Calendar App cannot find event "${eventName}". Please change it or type "/list_events" for events to delete`, interaction.user.id);
                interaction.reply({ embeds: [ embedWarning(strings, 'InternalServerError')], ephemeral: true });
                return false;
            }
        }
    }
}