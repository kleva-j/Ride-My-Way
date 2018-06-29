import model from '../dummyModels/index';

const { rides, requests } = model;

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
      requests.forEach((request) => {
        if(request.driverID === gottenRide.driver.id) {
          const { name, gender} = req.body;
          request.request.push({
            name,
            gender,
            reqStatus: 'pending'
          })
        }
      });
      res.status(201).json({
        message: 'Ride request sent successfully!',
        data: {
          gottenRide,
          request,
        }
      });
    } else {
      res.status(404).json({
        message: `Ride with id of ${rideId} was unsuccessful`
      });
    }
  }

  /**
   * get a specific ride offer
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and ride data
   * @memberof RideController
   */
  static getSpecificRide(req, res) {
    const rideId = parseInt(req.params.rideId, 10);
    let gottenRide;
    rides.forEach((ride) => {
      if (ride.id === rideId) {
        gottenRide = ride;
      }
    });
    if(!gottenRide) res.status(404).json({ message: `Ride with id of ${rideId} is not found`})
    res.status(200).json({
      message: 'Ride offer gotten successfully!',
      data: gottenRide
    });
  }

  /**
   * Get All rides
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware
   * @return {object} Message and data of the rides
   * @memberof RideMiddleware
   */
  static getRides(req, res, next) {
    const { date, stop } = req.query;
    if (!date && !stop) {
      res.status(200).json({
        message: 'All rides gotten successfully',
        data: rides
      });
    }
    let filteredRides;
    if (date && stop) {
      filteredRides = rides.filter(ride => ride.date.toLowerCase() === date.toLowerCase()
      && ride.stop.toLowerCase() === stop.toLowerCase());
    }
    if(stop) {
      filteredRides += rides.filter(ride => ride.stop.toLowerCase() === stop.toLowerCase());
    }
    if(date) {
      filteredRides += rides.filter(ride => ride.date.toLowerCase() === date.toLowerCase());
    }
    if(!filteredRides){
      res.status(404).json({
        message: 'Not Found',
        error : 'Ride not found in the database'
      })
    }
    else {
      res.status(200).json({
        message: 'Ride gotten successfully',
        data: filteredRides
      })
    }
  }

}

export default RideController;
