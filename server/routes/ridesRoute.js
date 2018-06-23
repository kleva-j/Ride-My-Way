import express from 'express';
import RideMiddleware from '../middlewares/RideMiddleware';
import RideController from '../controllers/RideController';

const {
  getAllRides, getByDateAndDest, getByDate, getByDestination
} = RideMiddleware;

const { createRideOffer } = RideController;

const rideRouter = express.Router();

rideRouter.route('/rides')
  .post(createRideOffer)
  .get(getByDate, getByDestination, getByDateAndDest, getAllRides);

export default rideRouter;
