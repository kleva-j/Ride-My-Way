import rideRoute from './ride/ridesRoute';
import userRoute from './user/userRoute';

export default (app) => {
  app.use('/api/v1', rideRoute);
  app.use('/api/v1/auth', userRoute);
};
