const fs = require('fs');

const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute(message) {
        // let lower = message.content.toLowerCase();
        if(message.content.toLowerCase().includes('cal_app help')) {
            fs.readFile('src/events/txts/errorlist.txt', (err, data) => {
                if (err) throw err;
                let temp = data.toString();
                var lines = []
                var temp_line = '';
                // create readable data from errorlist
                for (let i = 0; i < temp.length; i++) {
                    // check for ' "'s, which represent new 100s range
                    // and '\n's, which represent new lines
                    if (temp[i] == '.') {
                        lines.push(temp_line);
                        temp_line = '';
                    } else if (temp[i] === '"' || temp[i] === "\r" || temp[i] === "\n") {
                        continue;
                    } else if (temp_line == '') {
                        temp_line = `${temp[i].toString()}`;
                    } else {
                        temp_line = temp_line + temp[i].toString();
                    }
                }
                let arg = [], dict ={}, values = '';

                // organize data into: arg = [{name: 'name', 'value': 'values' }]
                for (let i = 0; i < lines.length; i++) {
                    lines[i] = lines[i].trim();
                    if (lines[i].includes('00s') || lines[i] == "Quit") {
                        if (dict['name'] != undefined) {
                            dict['value'] = values;
                            arg.push(dict)
                        }

                        dict = {};
                        values = '';
                        dict["name"] = lines[i];

                    } else if (!lines[i] == "") {
                        values = `${values}${lines[i]}\n`;
                    }
                }
                arg.push(
                    {name: '\u200B', 
                        value: `\n`},

                    {name: 'ALL COMMANDS', 
                            value: `\u200B`},
                    {name: '/add_event', value: `Adds an event to the discord_calendar_app's DB(5 events max per user).
                                                It takes in two required arguments: 
                                                event_name, the name of the event being added, with a max of 30 characters, and
                                                event_date, which takes in the date, in GMT time, of the event: It must follow either format: MM-DD-YYYY or  MM-DD-YYYY`},
                    {name: "/delete_event", value: `Deletes an event that has not came up yet. It takes in one required parameter:
                                                event_name. THIS ACTION IS NOT REVERSIBLE`},
                    {name: "/list_events", value: `Lists all events under your user profile.`},
                    { name: `Type 'Cal_App help' for commands`, value: `\u200B` });
                const embed = embedWarningv2(arg)
                // message.channelId.send(get_message)
                message.reply({ embeds: [embed], ephemeral: true })
              });
        }
    }
}

function embedWarningv2(args) {
    const hi = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('🆘 Calendar App Help 🆘')
        .setAuthor({ name: 'Calendar App', iconURL: 'https://static-00.iconduck.com/assets.00/spiral-calendar-emoji-2048x2039-kbx4wd0j.png', url: 'https://github.com/nathantsai1/discord_calendar' })
        .setDescription('Description of error codes and meanings, and how to use the Calendar App')
        .setThumbnail('https://files.slack.com/files-pri/T0266FRGM-F07A9MYQ8J1/blahaj-shock.webp?pub_secret=6d3125257e')
        .addFields(
            args
        )
        .setTimestamp();
    return hi;
}
