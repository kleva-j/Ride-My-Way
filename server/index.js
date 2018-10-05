import rideRoute from './ride/ridesRoute';
import userRoute from './user/userRoute';
import authRoute from './user/authRoute';

export default (app) => {
  app.use('/api/v1', rideRoute);
  app.use('/api/v1/user', authRoute);
  app.use('/api/v1/auth', userRoute);
};
