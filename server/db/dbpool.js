import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.ONLINE_DB_URL
});

export default pool;
