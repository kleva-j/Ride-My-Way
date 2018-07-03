import pg from 'pg';

const URL = 'postgres://vhzmtdts:y8TA6YamhS8wUnvzwxNo-1vN9uth2nAp@baasu.db.elephantsql.com:5432/vhzmtdts';
var conString = process.env.ELEPHANTSQL_URL || URL;
var client = new pg.Client(conString);
client.connect((err) => {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', (err, result) => {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});