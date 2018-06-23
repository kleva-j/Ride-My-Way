import express from 'express';
import RideMiddleware from '../middlewares/RideMiddleware';
import RideController from '../controllers/RideController';

const {
  getByDateAndDest, getByDate, getByDestination, getAllRides
} = RideMiddleware;

const { createRideOffer, makeRequestToJoin, getRide } = RideController;

const rideRouter = express.Router();

rideRouter.route('/rides')
  .post(createRideOffer)
  .get(getByDate, getByDestination, getByDateAndDest, getAllRides);

rideRouter.route('/rides/:rideId')
  .get(getRide);

rideRouter.route('/rides/:rideId/requests')
  .post(makeRequestToJoin);


export default rideRouter;
