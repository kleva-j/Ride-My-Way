import pool from './../../config/config';

/**
 * @class RideController
 * @classdesc Implements user being able to create a ride offer, get specific ride offer.
 * make a request to join a ride
 */
class Ride {
  /**
   * create ride offer
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and ride data
   * @memberof Ride
   */
  static createRide(req, res) {
    const data = [
      req.body.location, req.body.destination, Number(req.body.slot),
      req.body.time, req.currentUser.id, req.currentUser.username,
      req.body.carModel, req.body.departureDate
    ];
    const sql = 'INSERT INTO rides(location, destination, seats, time, user_id, driver, carModel, takeOffDate) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

    pool((err, client, done) => {
      if (err) res.status(500).jsend.error({ message: 'Error connecting to database' });
      return client.query(sql, data, (error, ride) => {
        done();
        if (error) res.status(400).jsend.error({ message: 'Error creating ride' });
        res.jsend.success({ ride: ride.rows[0] });
      });
    });
  }

  /**
   * create ride offer
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and ride data
   * @memberof RideController
   */
  static getAllRides(req, res) {
    const sql = 'SELECT * FROM rides';

    pool((err, client, done) => {
      if (err) res.status(500).jsend.error({ message: 'Internal Server Error' });
      client.query(sql, (error, response) => {
        done();
        if (error) res.status(400).jsend.error({ message: 'Error fetching rides' });
        else if (!response) res.status(404).jsend.fail({ message: 'No rides found' });
        res.jsend.success({ rides: response.rows });
      });
    });
  }
  /**
   * create ride offer
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and ride data
   * @memberof Ride
   */
  static deleteRide(req, res) {
    const sql1 = 'DELETE FROM rides WHERE id = $1';
    const { currentUser } = req;

    const afterEffects = () => {
      const sql2 = 'DELETE FROM request WHERE ride_id = $1';

      pool((err, client, done) => {
        if (err) return res.status(500).jsend.error({ message: 'Internal Server Error' });

        client.query(sql2, [req.ride.id], (err) => {
          done();
          if (err) return res.status(500).jsend.error({ message: 'Internal Server Error' });
          res.jsend.success({ message: 'Requests made to this ride were sucessfully deleted' });
        });
      });
    };

    pool((err, client, done) => {
      if (err) return res.status(500).jsend.error({ message: 'Internal Server Error' });

      if (currentUser.id === req.ride.user_id) {
        client.query(sql1, [req.ride.id], (err) => {
          done();
          if (err) return res.status(500).jsend.error({ message: 'Internal Server Error' });
          afterEffects();
          res.jsend.success({ message: 'Ride sucessfully deleted' });
        });
      }
    });
  }

  /**
   * cancel ride offer
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and ride data
   * @memberof Ride
   */
  static cancelRide(req, res) {
    const sql1 = 'UPDATE rides SET status = $1 WHERE id = $2';

    const afterEffects = (status) => {
      const sql2 = 'UPDATE requests SET status = $1 WHERE ride_id = $2';

      pool((err, client, done) => {
        if (err) res.status(500).jsend.error({ message: 'Internal server error' });

        client.query(sql2, [status, req.ride.id], (error) => {
          done();
          if (error) res.status(500).jsend.error({ message: 'error completing request' });
        });
      });
    };

    if (req.currentUser.id !== req.ride.user_id) {
      res.status(403).jsend.fail({ message: 'You have no permission to this request' });
    } else if (req.ride.status === 'cancelled') {
      res.status(400).jsend.fail({ message: 'ride is already cancelled' });
    } else {
      pool((err, client, done) => {
        if (err) res.status(500).jsend.error({ message: 'error connecting to database' });

        client.query(sql1, ['cancelled', req.params.rideId], (error) => {
          done();
          if (error) res.status(400).jsend.error({ message: 'error while trying to cancel ride' });
          afterEffects('Ride has been cancelled');
          res.jsend.success({ message: 'The ride has been cancelled' });
        });
      });
    }
  }
}

export default Ride;
/**
 * complete ride
 * Edit ride
 * /