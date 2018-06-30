import express from 'express';
import RideMiddleware from '../middlewares/RideMiddleware';
import RideController from '../controllers/RideController';

const { validateInput, validateID } = RideMiddleware;

const { createRideOffer, makeRequestToJoin, getSpecificRide, getRides } = RideController;

const rideRouter = express.Router();

rideRouter.route('/rides')
  .post(validateInput, createRideOffer)
  .get(getRides);

rideRouter.route('/rides/:rideId')
  .get(validateID, getSpecificRide);

rideRouter.route('/rides/:rideId/requests')
  .post(validateID, makeRequestToJoin);


export default rideRouter;
