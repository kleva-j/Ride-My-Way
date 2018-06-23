import express from 'express';
import RideMiddleware from '../middlewares/RideMiddleware';

const {
  getAllRides, getByDateAndDest, getByDate, getByDestination
} = RideMiddleware;

const rideRouter = express.Router();

rideRouter.route('/rides')
  .get(getByDate, getByDestination, getByDateAndDest, getAllRides);

export default rideRouter;
