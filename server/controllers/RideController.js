import model from '../dummyModels/index';

const { rides } = model;

/**
 * @class RideController
 * @classdesc Implements user being able to create a ride offer, get specific ride offer.
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
   * @memberof RideController
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

  /**
   * make ride request
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and ride data
   * @memberof RideController
   */
  static makeRequestToJoin(req, res) {
    const rideId = parseInt(req.params.rideId, 10);
    let gottenRide;
    rides.forEach((ride) => {
      if (ride.id === rideId) {
        gottenRide = ride;
      }
    });
    if (gottenRide) {
      res.status(201).json({
        message: 'Ride request sent successfully!',
        data: gottenRide
      });
    } else {
      res.status(404).json({
        message: 'Ride request was unsuccessful'
      });
    }
  }

  /**
   * get a ride offer
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and ride data
   * @memberof RideController
   */
  static getRide(req, res) {
    const rideId = parseInt(req.params.rideId, 10);
    let gottenRide;
    rides.forEach((ride) => {
      if (ride.id === rideId) {
        gottenRide = ride;
      }
    });
    res.status(200).json({
      message: 'Ride offer gotten successfully!',
      data: gottenRide
    });
  }
}

export default RideController;
