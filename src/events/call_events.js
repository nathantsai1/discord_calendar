const { embedEvent } = require('./subs/embed');
const { get_info, upload_info, get_all_info } = require('./NeonDB/db_work');
const { Events } = require("discord.js");
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };
require("dotenv").config();

let call = async function(client) {
  let x = 0;
  while (x <2) {
  // // do delay for every 2 hours(100 ms/s * 60 s/m * 60 m/h * 2h)
  console.log('call_events working')
  let i;
  await delay(1000*10);
  console.log('delay done');
  let info = get_all_info()
  if (!info.length == 0) {
    for (const z in info) {
      i = info[z];
      event_time = Number(i['event_date']) - Date.now()
      // check if it is:
      if ( (1000 * 60 * 60 * 24 * 7 > event_time) || (100 * 60 * 60 * 24 * 8  < event_time )) {
        // less than 7 days
        client.users.fetch(i['discord_user_id'], false).then((user) => { user.send({ embeds: [ embedEvent(i.event_name, '7 days')]}); });
      } else if ((1000 * 60 * 60* 24 * 31 < event_time) && (event_time < 1000 * 60 * 60* 24 * 32)) {
        // one month
        client.users.fetch(i['discord_user_id'], false).then((user) => { user.send({ embeds: [ embedEvent(i.event_name, '1 month')]}); });
      }  else if ((1000 * 60 * 60 * 24 * 4 < event_time) && (event_time < 1000 * 60 * 60 * 24 * 5)) {
        // 5 days
        client.users.fetch(i['discord_user_id'], false).then((user) => { user.send({ embeds: [ embedEvent(i.event_name, '5 days')]}); });
      } else if ((1000 * 60 * 60 * 24 * 3 < event_time) && (event_time < 1000 * 60 * 60 * 24 * 4)) {
        // 3 days
        client.users.fetch(i['discord_user_id'], false).then((user) => { user.send({ embeds: [ embedEvent(i.event_name, '3 days')]}); });
      } else if ((1000 * 60 * 60 * 24 * 1 < event_time) && (event_time < 1000 * 60 * 60 * 24 * 2)) {
        // 1 days
        client.users.fetch(i['discord_user_id'], false).then((user) => { user.send({ embeds: [ embedEvent(i.event_name, 'TODAY')]}); });
      } else if ((1000 * 60 * 60 * 24 * 182 < event_time) && (event_time < 1000 * 60 * 60 * 24 * 183)) {
        // 1 days
        client.users.fetch(i['discord_user_id'], false).then((user) => { user.send({ embeds: [ embedEvent(i.event_name, '6 months')]}); });
      }
    }
    x++;
  }}
        };

function delay(n) {  
  console.log('delay working')
  return new Promise(resolve => setTimeout(resolve, n));
}
module.exports = {call};