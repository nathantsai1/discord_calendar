const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute(message) {
        console.log(message.content)
        if(message.content === 'duck') {
            message.reply('quack');
        }
        if (message.content === 'quack') {
            message.reply('quack');
        }
    }
}