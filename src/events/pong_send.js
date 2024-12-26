const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'ping') {
            // console.log(interaction);
            interaction.reply('pong');
        }
    }
}

// module.exports = {
//     name: Events.InteractionCreate,
//     once: false,
//     async execute(interaction) {

//     }
// }