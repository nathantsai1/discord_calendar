require("dotenv").config();

const { delete_info, get_info } = require('./NeonDB/db_work');
const { Events } = require("discord.js");
const { make_string } = require('./subs/helpers.js');
const { embedWarning } = require('./subs/embed');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (interaction.commandName == "delete_event") {
            const eventName = interaction.options.getString('event_name');
            const is_there = await get_info(interaction.user.id);
            if (is_there.length == 0) {
                let strings = make_string(`604 error: There seems to be no event '${eventName}' associated with user '${interaction.user.globalName}'`, interaction.user.id);
                interaction.reply({ embeds: [ embedWarning(strings, 'DB error')], ephemeral: true });
                return false;
            };
            for (let i in is_there) {
                if (is_there[i].event_name == eventName) {
                    break;
                } else if (i == is_there.length - 1) {
                    let strings = make_string(`604 error: There seems to be no event '${eventName}' associated with user '${interaction.user.globalName}'`, interaction.user.id);
                    interaction.reply({ embeds: [ embedWarning(strings, 'DB error')], ephemeral: true });
                    return false;
                }
            }

            const is_true = await delete_info(interaction.user.id, eventName);

            // error handling
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