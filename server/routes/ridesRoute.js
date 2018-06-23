import express from 'express';
import RideMiddleware from '../middlewares/RideMiddleware';

const { getAllRides } = RideMiddleware;

const rideRouter = express.Router();

rideRouter.route('/rides')
  .get(getAllRides);

export default rideRouter;
