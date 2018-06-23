import model from '../dummyModels/index';

const { rides } = model;

/**
 * @class RideController
 * @classdesc Implements user being able to create a ride offer,
 * make a request to join a ride
 */
class RideController {
  /**
   * create ride offer
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and ride data
   * @memberof BusinessController
   */
  static createRideOffer(req, res) {
    const {
      start, date, stop, driver
    } = req.body;
    const newRide = {
      id: rides[rides.length - 1].id + 1,
      start,
      stop,
      driver,
      date,
      passengers: []
    };
    rides.push(newRide);
    res.status(201).json({
      message: 'Ride offer added successfully!',
      data: rides[rides.length - 1]
    });
  }
}

export default RideController;