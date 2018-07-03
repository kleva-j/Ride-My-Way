import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.ONLINE_DB_URL
});


pool.query('CREATE TABLE usrs', (err, response) => {
  if(err) {
    return console.error('could not create table', err);
  }
  if(response) {
      console.log('User sucessfully created')
  }
//   client.query('SELECT NOW() AS "theTime"', (err, result) => {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)

    pool.end();

});