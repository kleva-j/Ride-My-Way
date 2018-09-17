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
DROP TABLE IF EXISTS rides;
CREATE TABLE rides(id SERIAL PRIMARY KEY, location VARCHAR(255) NOT NULL, destination VARCHAR(255) NOT NULL, slot INTEGER NOT NULL, time TIME NOT NULL, user_id UUID REFERENCES users(id) ,driver VARCHAR(255) NOT NULL, carModel VARCHAR(255) NOT NULL, takeOffDate DATE NOT NULL, status VARCHAR(255) DEFAULT 'pending', riders TEXT[] DEFAULT '{}', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ);
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
    console.log('requests table created');
  }
});
