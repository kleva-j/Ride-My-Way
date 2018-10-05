import express from 'express';
import requestController from './request';

const {
  createRequest, updateRequestStatus, getAllRequest,
  cancelRequest, deleteRequest, getSingleRequest
} = requestController;

const reqRouter = express.Router();

reqRouter.route('requests')
  .get(getAllRequest);
reqRouter.route('/requests/:reqId')
  .get(getSingleRequest)
  .post(updateRequestStatus, cancelRequest)
  .delete(deleteRequest);
reqRouter.route('/requests/:userId/:rideId/request')
  .post(createRequest);

export default reqRouter;
