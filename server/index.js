import rideRoute from './ride/ridesRoute';
import userRoute from './user/userRoute';
import reqRoute from './request/reqRoute';

export default (app) => {
  app.use('/api/v1/rides', rideRoute);
  app.use('/api/v1/auth', userRoute);
  app.use('/api/v1/user/:userId/requests', reqRoute);
};
