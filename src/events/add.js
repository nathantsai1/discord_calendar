const { Events } = require("discord.js");
const embed = require('./subs/embed');
const { get_info, upload_info } = require('./NeonDB/db_work');
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };
const { make_string } = require('./subs/helpers.js');
require("dotenv").config();


const ALLOWED_EVENTS = 10;

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        console.log(interaction)
        if (interaction.commandName == 'add_event') {

        const eventName = interaction.options.getString('event_name');
        const eventDate = interaction.options.getString('event_date');

        // error handling
        // see if this the input from User is correct
        if (eventName.length > 30 || eventName.length < 1) {
            let strings = make_string('501 error: Please change event_name length to length of 1-30 characters', interaction.user.id);
            interaction.reply({ embeds: [embed.embedWarning(strings, 'string_len error')] });
            return false;
        } else if (!eventDate.length == 10 || !eventDate.length == 13) {
            let strings = make_string('502 error: Please change event_date length to length of 1-30 characters', interaction.user.id);
            interaction.reply({ embeds: [embed.embedWarning(strings, 'format error')] })
            return false;
        }
        // check if date is in the right format (2 dates, 1 dash, 0 other, all numbers)
        var num = [], dash = 0, other = 0;
        for (let i = 0; i < eventDate.length; i++) {
            if (eventDate[i] === "-") {
                dash++;
            } else if (isNumber(eventDate[i])) {
                num.push(eventDate[i]);
            } else {
                other++;
            }
        }

        if ((!dash == 2) || (!other == 0 && !other == 1) || (!num.length == 8 && !num.length == 10)) {
            let strings = make_string('502 error: Please change event_date to be of format: MM-DD-YYYY or MM-DD-YYYY HH', interaction.user.id);
            interaction.reply({ embeds: [embed.embedWarning(strings, 'event_date error')], ephemeral: true })
            return false;
        };

        const date = embed.getDate(num);
        // more error checking
        if (date == 0) {
            let strings = make_string('503 error: Please change event_date hour argument to be an integer between 1 to 24', interaction.user.id);
            interaction.reply({ embeds: [embed.embedWarning(strings, 'event_date error')], ephemeral: true })
            return false;
        } else if (date == 1) {
            let dating = new Date()
            let strings = make_string(`503 error: Please change event_date to be after ${dating.toLocaleDateString('en-US')}T${dating.getHours()}:${dating.getMinutes()}:${dating.getSeconds()} Locale time`, interaction.user.id);
            interaction.reply({ embeds: [embed.embedWarning(strings, 'event_date error')], ephemeral: true })
            return false;
        } else if (date == 3) {
            let strings = make_string('503 error: Please change event_date to be of valid date before 1 year from now', interaction.user.id);
            interaction.reply({ embeds: [embed.embedWarning(strings, 'event_date error')], ephemeral: true })
            return false;
        };

        // add to DB
    
        const info = await get_info(interaction.user.id);
        
        // check if event names collide with each other
        if (info) {
            // if there are events, check if their names intercollide with event_name
            if (info.length > ALLOWED_EVENTS && interaction.user.id !== process.env.OWNER_ID) {
                // holds too many events
                let strings = make_string('601 error: It seems like you have too many events. Please delete using "/delete_event" command', interaction.user.id);
                interaction.reply({ embeds: [embed.embedWarning(strings, 'Database error')], ephemeral: true });
                return false;
            }
            for (let i = 0; i < info.length; i++) {
                if (info[i].event_name === eventName) {
                    let strings = make_string(`602 error: It seems like you have already created name ${eventName}. Please change it`, interaction.user.id);
                    interaction.reply({ embeds: [embed.embedWarning(strings, ' ??? error')], ephemeral: true });
                    return false;
                }
            }
        } else if (info == 1) {
            // i prob messed up somewhere if this happened
            let strings = make_string(`500 internal error: The Calendar App has found an error; We are currently trying our best to fix it. Thank you for your patience.`, interaction.user.id);
            interaction.reply({ embeds: [embed.embedWarning(strings, 'InternalServerError')], ephemeral: true });
            return false;
        }

        // success, start on getting interaction
        let infov2;
        if (interaction.guildId == null) {
            infov2 = upload_info(interaction.user.id, eventName, date, null, null);
        } else {
            infov2 = upload_info(interaction.user.id, eventName, date, interaction.guildId.toString(), interaction.channelId.toString());
        }
        if (infov2 && infov2 == 1) {
            let strings = make_string(`500 internal error: The Calendar App has found an error; We are currently trying our best to fix it. Thank you for your patience.`, interaction.user.id);
            interaction.reply({ embeds: [embed.embedWarning(strings, 'InternalServerError')], ephemeral: true });
            return false;
        }
        const new_date = new Date(date);
        interaction.reply(`Success! <@${interaction.user.id}> has created an event: "${eventName}" at date: ${new_date}`);
        interaction.user.send(`Success! <@${interaction.user.id}> has created an event: "${eventName}" at date: ${new_date}`);
        return true;
        }
    }
}