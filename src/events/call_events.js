const { get_all_info, delete_info } = require('./NeonDB/db_work');
require("dotenv").config();
const { Events } = require("discord.js");
const { embedEvent } = require('./subs/embed.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client){

    // do delay for every 6 hours(100 ms/s * 60 s/m * 60 m/h * 6h)
    while (true) {
      let i;
      await delay(1000*60*60*6);
      let info = await get_all_info();
      // check if info is coming up
      if (!info.length == 0) {
        for (const z in info) {
          i = info[z];
          event_time = Number(i['event_date']) - Date.now();
          // check if it is:
          if ((15724800000 <= event_time) && (event_time < 15811200000)) {
            // 6 mths
            fetch(client, [ '6 months', i]);
            
          } else if ((2678400000 <= event_time) && (event_time < 2764800000)) {
            // one month(31-32)
            fetch(client, ['1 month', i]);

          } else if ( (604800000 <= event_time) && ( event_time < 691200000 )) {
            // less than 7 days(7-8)
            fetch(client, ['7 days', i]);

          } else if ((345600000 <= event_time) && (event_time < 518400000)) {
            // 5 days(4-6)
            fetch(client, ['5 days', i]);

          } else if ((259200000 <= event_time) && (event_time < 345600000)) {
            // 3 days(3-4)
            fetch(client, [ '3 days', i]);

          } else if ((172800000 <= event_time) && (event_time < 259200000)) {
            // 2 days(2-3)
            fetch(client, ['2 days', i]);

          } else if ((86400000 <= event_time) && (event_time < 172800000)) {
            // 1 days(1-2)
            fetch(client, ['1 days', i]);

          } else if ((0 <= event_time) && (event_time < 86400000)) {
            // 0 days
            fetch(client, ['today', i]);
          } else if (event_time <= 0) {
            // the event already passed
            delete_info(i.discord_user_id, i.event_name);
          } 
        }
        return true;
      }
      return undefined; 
    };
  }
}

let delay = async function (n) {  
  return new Promise(resolve => setTimeout(resolve, n));
}

let fetch = async function (client, i) {
  try {
    if (i[1].event_channel_id !== null) {
      const channel = client.channels.cache.get(i[1].event_channel_id);
        // channel.send({embeds: [ embedEvent('<@everyone>' + i.event_name, i.event_date) ]})
        //   .catch(console.error);
      client.channels.cache.get(i[1].event_channel_id).send({embeds: [ embedEvent(i[1].event_name, i[0]) ]});
      return true;
    } else {
      await client.users.fetch(i[1].discord_user_id, false).then((user) => {
        user.send({ embeds: [ embedEvent(i[1].event_name, i[0])]}); 
        return true;  
      });
  }
  } catch (error) {
    console.log('error', error)
  }
}