import express from 'express';
import RideController from './RideController';
import verifyLogin from '../utils/authLogin';
import Validate from '../utils/validate';

const { validateInput } = Validate;

const {
  createRide,
  getSpecificRide,
  getAllRides,
  completeRide,
  editRide,
  cancelRide,
  deleteRide,
  GetUserRides,
} = RideController;

const rideRouter = express.Router();

rideRouter.route('/rides')
  .get(getAllRides);
rideRouter.route('/rides/:rideId')
  .get(getSpecificRide)
  .post(completeRide, editRide, cancelRide, deleteRide);
rideRouter.route('/rides/:userId/rides')
  .get(GetUserRides)
  .post(verifyLogin, validateInput, createRide);

export default rideRouter;

/**
 * validate user id
 * validata ride id
 * validate user data { email, password, phoneNumber fullname }
 * validate login data
 * validate date and time
 */
