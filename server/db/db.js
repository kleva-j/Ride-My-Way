import dotenv from 'dotenv';
import db from 'db';

dotenv.config();

db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
