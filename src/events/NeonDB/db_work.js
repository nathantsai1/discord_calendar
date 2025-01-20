require('dotenv').config();

const { neon } = require('@neondatabase/serverless');

// start db connection
const sql = neon(process.env.DATABASE_URL);

async function get_info(user_id) {
  try {
    const result = await sql`SELECT * FROM public.calendar_events_real 
      WHERE discord_user_id = ${user_id.toString()}`;
    return result;
  } catch (error) {
      console.log(error);
      return 1;
  }
}

async function get_all_info() {
  try {
    const result = await sql`SELECT * FROM public.calendar_events_real`;
    return result;
  } catch (error) {
      console.log(error);
      return 1;
  }
}

async function upload_info(user_id, eventName, eventDate, server_id, event_channel_id) {
  try {
    const result = await sql`
      INSERT INTO public.calendar_events_real
      (discord_user_id, event_date, event_name, server_id, event_channel_id)
      VALUES (${user_id.toString()}, ${eventDate.toString()}, ${eventName.toString()}, ${server_id}, ${event_channel_id})`;
      return result;
  } catch (NeonDBError) {
    console.log('[Error]', NeonDBError);
    return 1;
  }
}

async function delete_info(user_id, eventName) {
  try {
  const result = await sql`
    DELETE FROM public.calendar_events_real WHERE
      discord_user_id = ${user_id} AND 
      event_name = ${eventName}`;
      return result + 1;
  } catch(err) {
    console.log(err);
    return -1;
  }
}
module.exports = { get_info, upload_info, get_all_info, delete_info }