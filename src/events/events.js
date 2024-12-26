// const { Schema, model } = require("mongoose");
const { Events } = require("discord.js");
// var mongo = require('mongodb');
// var MongoClient = require('mongodb').MongoClient;
const embed = require('./subs/embed');
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        console.log(interaction)
        // interaction.reply(interaction.user.id)
        const eventName = interaction.options.getString('event_name');
        const eventDate = interaction.options.getString('event_date');

        // error handling
        
        // see if this is correct
        if (eventName.length > 30 || eventName.length < 1) {
            let strings = `<@${interaction.user.id}>` + '```501 error: Please change event_name length to length of 1-30 characters```'
            interaction.reply({ embeds: [embed.embedWarning(strings, 'eventDate error')] });
            return false;
        } else if (!eventDate.length == 10 || !eventDate.length == 13) {
            let strings = `<@${interaction.user.id}>` + '```501 error: Please change event_date length to length of 1-30 characters```'
            interaction.reply({ embeds: [embed.embedWarning(strings, 'eventDate error')] })
            return false;
        }
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
        // interaction.reply(`${num.length}, dash: ${dash}, other: ${other}, date: ${eventDate}`)
        if ((!num.length == 8 || !dash == 2 && !other == 0) || (!num.length == 10 || !dash == 2 && !other == 1)
        ) { 
            // interaction.reply(`<@${interaction.user.error - please change `); 
            let strings = `<@${interaction.user.id}>` + '```502 error: Please change event_date to be of format: MM-DD-YYYY or MM-DD-YYYY HH```'
            interaction.reply({ embeds: [embed.embedWarning(strings, 'event_date error')], ephemeral: true })
            return false;
        };
        const date = embed.getDate(num);
        console.log(date);
        
        // error check from main
        if (date == 0) {
            let strings = `<@${interaction.user.id}> \n "${eventDate}"` + '```503 error: Please change event_date hour argument to be an integer between 1 to 24 ```'
            interaction.reply({ embeds: [embed.embedWarning(strings, 'event_date error')], ephemeral: true })
            return false;
        }
        if (date == 1) {
            let strings = `<@${interaction.user.id}> \n "${eventDate}"` + '```503 error: Please change event_date to be after 24 hours from now```'
            interaction.reply({ embeds: [embed.embedWarning(strings, 'event_date error')], ephemeral: true })
            return false;
        }
        if (date == false) {
            let strings = `<@${interaction.user.id}>` + '```503 error: Please change event_date to be of valid date before 1 year from now```'
            interaction.reply({ embeds: [embed.embedWarning(strings, 'event_date error')], ephemeral: true })
            return false;
        };
        console.log(date)
        const new_date = new Date(date)
        // client.channels.get('1026279100626767924').send(message);
        interaction.reply(`Success! <@${interaction.user.id}> has created an event: "${eventName}" at date: ${new_date}`)
        interaction.user.send(`Success! <@${interaction.user.id}> has created an event: "${eventName}" at date: ${new_date}`);
        // MongoClient.connect(url, function(err, db) {
        //     if (err) throw err;
        //     var dbo = db.db("mydb");
        //     var myobj = { name: eventName, day: eventDate };
        //     dbo.collection("events").insertOne(myobj, function(err, res) {
        //       if (err) throw err;
        //       console.log("1 document inserted");
        //       db.close();
        //     });
        //   });
    }
    // interaction.channel.send(eventName[i]);
}