import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = "";

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DB_TEST;
}
else if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DB_DEV;
}
else { connectionString = process.env.DB_URL }

let sql = `
DROP TABLE IF EXISTS users;
CREATE TABLE users(id UUID PRIMARY KEY, username VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
`;

const client = new Client(connectionString);
client.connect();
client.query(sql, (err) => {
  if(err) {
    client.end();
    console.log(err.stack);
  }
  else {
    client.end();
    console.log('users table created');
  }
});