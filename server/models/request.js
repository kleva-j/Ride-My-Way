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
DROP TABLE IF EXISTS requests;
CREATE TABLE requests(id SERIAL PRIMARY KEY, rider VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL DEFAULT 'pending request', user_id UUID REFERENCES users(id), driver_id UUID NOT NULL, ride_id INTEGER REFERENCES rides(id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ);
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
