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
   * @param {function} next - The next middleware
   * @return {object} Message and data of the rides
   * @memberof RideMiddleware
   */
  static getAllRides(req, res) {
    res.status(200).json({
      message: 'Gotten all rides successfully',
      data: rides
    });
  }
}

export default RideMiddleware;
