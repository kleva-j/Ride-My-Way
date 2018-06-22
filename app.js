import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// use middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.status(200).send('Welcome to Ride-My-Way Api');
});

app.get('*', (req, res) => {
  res.status(404).send('Welcome to Ride-My-Way Api, this route does not exist!');
});

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
