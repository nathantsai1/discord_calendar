const { Events, ActivityType } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client){
        console.log(`Ready! logged in as ${client.user.tag}`)
        
        client.user.setActivity({
            name: "with me 🤤",
            type: ActivityType.Playing,
        })
    }   
}