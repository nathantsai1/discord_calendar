const { delete_info } = require('../NeonDB/db_work');
const { Events } = require("discord.js");

require("dotenv").config();

let call = async function(info) {
  // do delay for every 2 hours(100 ms/s * 60 s/m * 60 m/h * 2h)
  let i;
  await delay(1000*1);
  // let info = [{id: 2,discord_user_id: '1234567891234567890',event_date: '1736836511',event_name: 'test',server_id: '786773227275026442',event_channel_id: '1224931117438861385'}]
  if (!info.length == 0) {
    let list = [];
    for (const z in info) {
      i = info[z];
      event_time = Number(i['event_date']) - Date.now();
      console.log('info', event_time);
      console.log(Date.now(), Number(i['event_date']));
      console.log('id', i['discord_user_id'])
      // check if it is:
      if ( (1000 * 60 * 60 * 24 * 7 <= event_time) && ( event_time < 1000 * 60 * 60 * 24 * 8 )) {
        // less than 7 days
        list.push([i['discord_user_id'], i.event_name, '7 days']);
      } else 
      if ((1000 * 60 * 60* 24 * 31 <= event_time) && (event_time < 1000 * 60 * 60* 24 * 32)) {
        // one month
        list.push([i['discord_user_id'], i.event_name, '1 month']);
      }  else if ((1000 * 60 * 60 * 24 * 4 <= event_time) && (event_time < 1000 * 60 * 60 * 24 * 5)) {
        // 5 days
        list.push([i['discord_user_id'], i.event_name, '5 days']);
      } else if ((1000 * 60 * 60 * 24 * 3 <= event_time) && (event_time < 1000 * 60 * 60 * 24 * 4)) {
        // 3 days
        list.push([i['discord_user_id'], i.event_name, '3 days']);
      } else if ((1000 * 60 * 60 * 24 * 2 <= event_time) && (event_time < 1000 * 60 * 60 * 24 * 3)) {
        // 2 days
        list.push([i['discord_user_id'], i.event_name, '2 days']);
      } else if ((1000 * 60 * 60 * 24 * 1 <= event_time) && (event_time < 1000 * 60 * 60 * 24 * 2)) {
        // 1 days
        list.push([i['discord_user_id'], i.event_name, '1 days']);
      } else if ((1000 * 60 * 60 * 24 * 182 <= event_time) && (event_time < 1000 * 60 * 60 * 24 * 183)) {
        // 6 mths
        list.push([i['discord_user_id'], i.event_name, '6 months']);
      } else if (event_time <= 0) {
        // the event already passed
        delete_info(i['discord_user_id'], i['event_name']);
      }
    }
  return list;
  }
  return undefined; 
};

let delay = async function (n) {  
  return new Promise(resolve => setTimeout(resolve, n));
}

module.exports = { call };