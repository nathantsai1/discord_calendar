const embed = require('./subs/embed');
const { get_info, get_event_info } = require('./NeonDB/db_work');
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
            const eventName = interaction.options.getString('event_name');
            const is_true = await get_event_info(interaction.user.id);
            // // error handling

            
            // const date = embed.getDate(num);
            

            // return false;
        }
    }
}