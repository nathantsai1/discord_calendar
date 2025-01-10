const { Events, ActivityType } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if(!interaction.isStringSelectMenu()) return;

        if (interaction.customId === "select") {
            let choices = "";
    
            await interaction.values.forEach(async value => {
                choices += `${value}`
            })
    
            await interaction.reply({ content: `${choices}`})
        }
    }
}