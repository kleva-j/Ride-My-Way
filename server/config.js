import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = '';

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DB_TEST;
} else if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DB_DEV;
} else { connectionString = process.env.DB_URL; }

const pool = new Pool({ connectionString });

export default (cb) => {
  pool.connect((err, client, done) => cb(err, client, done));
};
