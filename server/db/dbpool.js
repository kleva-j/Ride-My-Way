import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.ONLINE_DB_URL
});


pool.connect((err, client, done) => {
  if (err) return done(err);

  pool.query('SELECT $1::text as name', ['pg-pool'], (err, res) => {
    done();
    if (err) {
      return console.error('query error', err.message, err.stack);
    }
    console.log('hello from', res.rows[0].name);
  });
});
