const { EmbedBuilder } = require("discord.js");
var exports = {};

function epoch (date) {
    return Date.parse(date)
}

function embedWarning(warning, title) {
    const hi = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('⚠️ WARNING: ERROR ⚠️')
        .setAuthor({ name: 'Calendar App', iconURL: 'https://static-00.iconduck.com/assets.00/spiral-calendar-emoji-2048x2039-kbx4wd0j.png', url: 'https://discord.js.org' })
        .setDescription('The Calendar App has found errors in your response')
        .setThumbnail('https://files.slack.com/files-pri/T0266FRGM-F07A9MYQ8J1/blahaj-shock.webp?pub_secret=6d3125257e')
        .addFields(
            { name: `${title}`, value: `${warning}` },
            { name: '\u200B', value: '\u200B' },
            { name: `Type 'help' for commands`, value: ` ` },
        )
        // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        // .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
    return hi;
}

function getDate(num) {
    const month = num[0] * 1 + num[1];
    const day = num[2]*1 + num[3];
    const year = num[4]*100 + num[5]*10 + num[6]*1 + num[7];
    var date = `${year}-${month}-${day}`
    if (num.length == 10) {
        const hour = num[8] * 1 + num[9];
        date = date.concat(` ${hour}:00:00`);
    }
    // var toEpoch = (year - 1970) * 3.156e+7 + (month - 1) * 
    const dateToday = new Date(date)
    const timestamp = epoch(dateToday)
    if (timestamp !== timestamp) {
        return 0;
    }
    else if (timestamp - Date.now() < 0) {
        // should be over today
        return 1;
    } else if (timestamp - Date.now() < 3600 * 24) {
        // should be over 1 day
        return 2;
    } else if (timestamp - Date.now() < 31536000) {
        // past one year
        return 3;
    }
    return timestamp;
}
module.exports = { embedWarning, getDate };