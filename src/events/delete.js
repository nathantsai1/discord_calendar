const embed = require('./subs/embed');
const { get_info, upload_info } = require('./NeonDB/db_work');
const { Events } = require("discord.js");

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };
require("dotenv").config();

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (interaction.commandName == "delete_event") {
            interaction.reply('working on it')
            console.log('working on /delete_event')
            // const eventName = interaction.options.getString('event_name');
            // const eventDate = interaction.options.getString('event_date');
 
            // // error handling
                    
            //         // see if this is correct
            // if (eventName.length > 30 || eventName.length < 1) {
            //     let strings = make_string('501 error: Please change event_name length to length of 1-30 characters', interaction.user.id);
            //     interaction.reply({ embeds: [embed.embedWarning(strings, 'string_len error')] });
            //     return false;
            // } else if (!eventDate.length == 10 || !eventDate.length == 13) {
            //     let strings = make_string('502 error: Please change event_date length to length of 1-30 characters', interaction.user.id);
            //     interaction.reply({ embeds: [embed.embedWarning(strings, 'format error')] })
            //     return false;
            // }

            // var num = [], dash = 0, other = 0;
            // for (let i = 0; i < eventDate.length; i++) {
            //     if (eventDate[i] === "-") {
            //         dash++;
            //     } else if (isNumber(eventDate[i])) {
            //         num.push(eventDate[i]);
            //     } else {
            //         other++;
            //     }
            // }

            // if ((!num.length == 8 || !dash == 2 && !other == 0) || (!num.length == 10 || !dash == 2 && !other == 1)) { 
            //     // interaction.reply(`<@${interaction.user.error - please change `); 
            //     let strings = make_string('502 error: Please change event_date to be of format: MM-DD-YYYY or MM-DD-YYYY HH', interaction.user.id);
            //     interaction.reply({ embeds: [embed.embedWarning(strings, 'event_date error')], ephemeral: true })
            //     return false;
            // };
            // const date = embed.getDate(num);
            

            // return false;
        }
    }
}