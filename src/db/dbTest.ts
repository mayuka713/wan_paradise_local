import { Client } from 'pg';

const client = new Client({
  user: 'your_db_user',
  host: 'localhost',
  password: 'your_password',
  port: 5432,
});

async function createDatabase() {
  await client.connect();
  await client.query('CREATE DATABASE your_database_name');
  await client.end();
}

createDatabase().catch(console.error);
