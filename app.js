import express from 'express';
import bodyParser from 'body-parser';
import jsend from 'jsend';
import cors from 'cors';
import morgan from 'morgan';

import rideRouter from './server/routes/ridesRoute';
import userRouter from './server/routes/userRoute';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', rideRouter);
app.use('/api/v1/auth', userRouter);
// app.use('api/v1/users')

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Ride-My-Way Api');
});

app.get('*', (req, res) => {
  res.status(404).send('Wrong endpoint, visit api/v1/rides');
});

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
