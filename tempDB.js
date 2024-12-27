require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const { DB_URL } = process.env;

const sql = neon(DB_URL);
async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result);
}
getPgVersion();

if (red red red alert alert continue from here - created table in neon, but have not implemented this into vscode help pls)
