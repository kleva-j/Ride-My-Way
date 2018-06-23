import model from '../dummyModels/index';

const { rides } = model;
/**
 * @class BusinessMiddleware
 * @classdesc Implements user being able to get businesses by location and category
 */
class RideMiddleware {
  /**
   * Get all rides
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and data of all rides
   * @memberof RideMiddleware
   */
  static getAllRides(req, res) {
    res.status(200).json({
      message: 'Gotten all rides successfully',
      data: rides
    });
  }

  /**
   * Get specific rides
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware
   * @return {object} Message and data of the rides
   * @memberof RideMiddleware
   */
  static getByDateAndDest(req, res, next) {
    const { date, stop } = req.query;

    if (!date || !stop) {
      return next();
    }
    const filteredRides
        = rides.filter(ride =>
          ride.date.toLowerCase() === date.toLowerCase()
          && ride.stop.toLowerCase() === stop.toLowerCase());

    res.status(200).json({
      message: `Gotten all rides to ${stop} on ${date}`,
      data: filteredRides
    });
  }

  /**
   * Get rides by date
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware
   * @return {object} Message and data of the rides
   * @memberof RideMiddleware
   */
  static getByDate(req, res, next) {
    const { date } = req.query;
    if (!date) {
      return next();
    }
    const filteredRides = rides.filter(ride => ride.date === date);

    res.status(200).send({
      message: `Gotten ride(s) on ${date}`,
      data: filteredRides
    });
  }

  /**
   * Get rides by date
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware
   * @return {object} Message and data of the rides
   * @memberof RideMiddleware
   */
  static getByDestination(req, res, next) {
    const { stop } = req.query;
    if (!stop) {
      return next();
    }
    const filteredRides
        = rides.filter(ride => ride.stop.toLowerCase() === stop.toLowerCase());

    res.status(200).send({
      message: `Gotten all ride(s) to ${stop}`,
      data: filteredRides
    });
  }
}

export default RideMiddleware;
