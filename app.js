import express from 'express';
import bodyParser from 'body-parser';
import jsend from 'jsend';
import cors from 'cors';
import morgan from 'morgan';

import rideRouter from './server/routes/ridesRoute';
import userRouter from './server/routes/userRoute';

const app = express();
const logger = createLogger('RideMyWay');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
  optionSuccessStatus: 200,
};
app.options('*', cors(corsOptions));
app.use('*', cors(corsOptions));
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('combined'));
}

app.use('/api/v1', rideRouter);
app.use('/api/v1/auth', userRouter);
// app.use('api/v1/users')

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Ride-My-Way Api');
});

app.all('*', (req, res) => res.status(404).jsend.fail({ message: 'wrong endpoint: visit api with api/v1/rides' }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`app listening on port ${port} ...`);
});

export default app;
