const { Client, MessageEmbed } = require('discord.js');
const { botIntents } = require('./config/config');
const config = require('.env');

const client = new Client({
    intents: botIntents,
    partials: ['CHANNEL', 'MESSAGE'],
  });

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag);
  });

const getLastMsgs = async (msg) => {
    // fetching the last 10 messages
    const res = await msg.channel.messages.fetch({ limit: 10 });
  
    const lastTenMsgs = res.map((message) => {
      return message.content;
    });
    const embeds = [];

    lastTenMsgs.forEach((msg, index) => {
    const embed = new MessageEmbed()
        .setColor('ORANGE') // can be hex like #3caf50
        .setTitle(`Message ${index + 1}`)
        .setDescription(`${msg}`)
        .setFooter('Buddy says Hi');

    embeds.push(embed);
    });
    return embeds;
  };

  client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return; // do nothing if command is not preceded with prefix
  
    const userCmd = msg.content.slice(prefix.length);
  
    if (userCmd === commands.getName) {
        msg.reply(msg.author.username);
    } else if (userCmd === commands.tellJoke) {
        msg.channel.send('HTML bla bla bla'); // bad joke i guess, unless i don't have any jokes
    } else if (userCmd === commands.sad) {
        msg.author.send(reply);
    } else if (userCmd === commands.lastMsgs) {
      const reply = await getLastMsgs(msg);
      embed: [onlyEmbed]
    } else {
      msg.reply('I do not understand your command');
    }
  });

  const startBot = () => {
    client.login(config.DISCORD_TOKEN);
  };
  
  // export startBot as default
  module.exports = startBot;