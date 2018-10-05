import express from 'express';
import requestController from './request';
import verifyLogin from '../utils/authLogin';

const {
  createRequest, updateRequestStatus, getAllRequest,
  cancelRequest, deleteRequest, getSingleRequest
} = requestController;

const reqRouter = express.Router();

reqRouter.route('/')
  .get(verifyLogin, getAllRequest);
reqRouter.route('/:rideId/:reqId')
  .get(verifyLogin, getSingleRequest)
  .post(verifyLogin, updateRequestStatus, cancelRequest)
  .delete(verifyLogin, deleteRequest);
reqRouter.route('/:rideId/request')
  .post(verifyLogin, createRequest);

export default reqRouter;
