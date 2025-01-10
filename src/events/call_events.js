const { embedEvent } = require('./subs/embed');
const { get_info, upload_info, get_all_info } = require('./NeonDB/db_work');
const { Events } = require("discord.js");
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };
require("dotenv").config();

module.exports = {
    name: Events.InteractionCreate,
    once: true,
    async execute(interaction) {
        let event_time = 0;
        // while (true) {
          // // do delay for every 2 hours(100 ms/s * 60 s/m * 60 m/h * 2h)
          // await delay(100*60);
          // let info = get_all_info()
          let info = [{id: 17,discord_user_id: '1100233829446324244',event_date: '1762819200000',event_name: 'asdfsa',server_id: '1224931116868177995',event_channel_id: '1224931117438861385'}]
          console.log('s')
          // console.log(info.lengtH)
      
          if (!info.length == 0) {
            for (i in info) {
              console.log('for')
              event_time = Number(info.event_date) - Date.now()
              if ( (100 * 60 * 60* 24 * 7 > event_time) || (59400000  < event_time )) {
                i.server_id.send({ embeds: [ embedEvent(`${i.event_name}`, '7 days')]});
              } else {
                i.server_id.send({ embeds: [ embedEvent(`${i.event_name}`, '7 days')]});
              }
              console.log(embedEvent('sdf', 'sdf'))
              interaction.channelId.send('hi')
              // i.server_id.send({ embeds: [ embedEvent(`${i.event_name}`, '7 days')]});
              break;
            }
            // check if is 1 week from now
          }
        // }
    }
  };

function delay(n) {  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1);
      resolve('reloading background events')
      // resolve('foo');
    }, n)
  });
}