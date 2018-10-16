import express from 'express';
import RideController from './RideController';
import requestController from '../request/request';
import verifyLogin from '../utils/authLogin';
import Validate from '../utils/validate';

const { validateInput, validateRequestDetails } = Validate;

const {
  makeRequest, updateRequestStatus,
  getAllReqToYourRide, getAllYourReqToRide
} = requestController;

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

// fetch all rides, create a ride
rideRouter.route('/')
  .get(getAllRides)
  .post(verifyLogin, validateInput, createRide);

// fetch a specific ride, fetch all requests to particular ride, update your ride
rideRouter.route('/:rideId')
  .get(verifyLogin, getSpecificRide, getAllReqToYourRide)
  .put(verifyLogin, completeRide, editRide, cancelRide, deleteRide);

// fetch user's rides
rideRouter.route('/:userID/rides')
  .get(verifyLogin, GetUserRides); // not at all

// get user's request to join sent
rideRouter.route('/request/sent')
  .get(verifyLogin, getAllYourReqToRide); // half fixed

// make request to join a ride
rideRouter.route('/:rideID/request')
  .post(verifyLogin, validateRequestDetails, makeRequest); // check

// accept or reject a particular request
rideRouter.route(':rideID/requests/requestID')
  .put(verifyLogin, updateRequestStatus); // untouched

export default rideRouter;

/**
 * validate user id
 * validata ride id
 * validate user data { email, password, phoneNumber fullname }
 * validate login data
 * validate date and time
 *
 * fetch all rides requests
 */
