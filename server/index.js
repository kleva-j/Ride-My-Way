import rideRoute from './ride/ridesRoute';
import userRoute from './user/userRoute';

export default (app) => {
  app.use('/api/v1/users/rides', rideRoute);
  app.use('/api/v1/users/auth', userRoute);
};
/**
 * user functionality - respond to a request made to a ride.
 */
