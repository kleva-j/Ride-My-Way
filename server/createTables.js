import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = '';

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DB_TEST;
} else if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DB_DEV;
} else { connectionString = process.env.DB_URL; }

const sql = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS rides;
DROP TABLE IF EXISTS requests;

CREATE TABLE users(id UUID PRIMARY KEY, fullname VARCHAR(255), username VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());

CREATE TABLE rides(id SERIAL PRIMARY KEY, location VARCHAR(255) NOT NULL, destination VARCHAR(255) NOT NULL, seats INTEGER NOT NULL, time TIME NOT NULL, user_id UUID REFERENCES users(id), driver VARCHAR(255) NOT NULL, carModel VARCHAR(255) NOT NULL, takeOffDate DATE NOT NULL, status VARCHAR(255) DEFAULT 'pending', riders TEXT[] DEFAULT '{}', requestsToJoin TEXT[] DEFAULT '{}', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ);

CREATE TABLE requests(id SERIAL PRIMARY KEY, rider VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL DEFAULT 'pending request', user_id UUID REFERENCES users(id), driver_id UUID NOT NULL, ride_id INTEGER REFERENCES rides(id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ);
`;

const client = new Client(connectionString);

client.query(sql)
  .then(() => console.log('table created successfully'))
  .catch(err => console.log(err));
