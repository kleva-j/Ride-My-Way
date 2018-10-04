import rideRoute from './ridesRoute';
import userRoute from './userRoute';
import authRoute from './authRoute';

export default (app) => {
  app.use('/api/v1', rideRoute);
  app.use('/api/v1/user', authRoute);
  app.use('/api/v1/auth', userRoute);
};
