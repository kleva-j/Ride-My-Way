import pool from './../config/config';

/**
 * @class userController
 * @classdesc Implements user being able to create a ride offer, get specific ride offer.
 * make a request to join a ride
 */
class requestController {
  /**
   * Create New Request
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof requestController
   */
  static createRequest(req, res) {
    const sql1 = `
    INSERT INTO requests(rider, user_id, driver_id, ride_id) VALUES($1, $2, $3, $4) RETURNING *`;
    const { ride, currentUser } = req;
    const data = [
      currentUser.username, currentUser.id,
      ride.user_id, ride.id
    ];
    const reqToJoin = ride.requests.push(currentUser.username);

    const updateRide = () => {
      const sql2 = 'UPDATE rides SET requestsToJoin = array_append( requestsToJoin, $1 ) WHERE id = $2';
      pool((err, client, done) => {
        if (err) return res.status(404).jend.error({ message: 'Internal server error' });
        client.query(sql2, [reqToJoin, ride.id], (error, result) => {
          done();
          if (error) return res.status(400).jsend.error({ message: 'error creating request' });
          res.status(200).jsend.success({ message: result.rows[0] });
        });
      });
    };

    if (ride.status === 'cancelled' || ride.status === 'completed') {
      res.status(400).jsend.fail({ message: 'Sorry, this ride is no longer available' });
    } else if (ride.seats <= 0) {
      res.status(400).jsend.fail({ message: 'All available seats are taken' });
    } else if (ride.user_id === req.currentUser.id) {
      res.status(403).jsend.fail({ message: 'You cannot make request to your own ride' });
    } else {
      pool((err, client, done) => {
        if (err) return res.status(500).jsend.error({ message: 'Error connecting to database' });
        client.query(sql1, data, (error, response) => {
          done();
          if (error) return res.status(400).jsend.error({ message: 'Error registering user' });
          updateRide();
          res.jsend.success({ ride: response.rows[0] });
        });
      });
    }
  }

  /**
   * Register new user
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof requestController
   */
  static updateRequestStatus(req, res) {
    if (req.request.status === 'Accepted') {
      return res.jsend.fail({ message: 'ride request is already accepted' });
    } else if (req.request.status === 'Rejected') {
      return res.jsend.fail({ message: 'ride request is already rejected' });
    } else if (req.currentUser.id !== req.ride.user_id) {
      return res.status(403).jsend.fail({ message: 'you don\'t have the priviledge to access this endpoint.' });
    } else if (req.ride.seats <= 0) {
      return res.status(403).jsend.fail({ message: 'Sorry, there are no available seats' });
    }

    const { status } = req.body;

    const sql1 = 'UPDATE request SET status = $1 updated_at = NOW() where id = $2';
    pool((err, client, done) => {
      if (err) res.status(500).jsend.error({ message: 'error connecting to database' });
      client.query(sql1, [status, req.request.id], (error) => {
        done();
        if (error) res.status(500).jsend.error({ message: 'could not access request' });
      });
    });

    if (status === 'Accepted') {
      const sql2 = 'UPDATE rides SET riders = array_append( riders, $1 ) WHERE id = $2';
      pool((err, client, done) => {
        if (err) return res.status(500).jsend.error({ message: 'Error connecting to database' });
        client.query(sql2, [req.request.rider, req.ride.id], (error, user) => {
          done();
          if (error) res.status(400).jsend.error({ message: 'Error accepting request' });
          res.jsend.success({ ride: user.rows[0] });
        });
      });
    }
  }

  /**
   * Get all requests to ride
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof requestController
   */
  static getAllRequest(req, res) {
    const { ride } = req;

    if (ride.user_id !== req.currentUser.id) {
      const sql = 'SELECT * FROM requests WHERE user_id = $1 AND ride_id = $2';
      pool((err, client, done) => {
        if (err) res.status(500).jsend.error({ message: 'error connecting to database' });

        client.query(sql, [req.currentUser.id, ride.id], (error, result) => {
          done();
          if (error) return res.status(400).jsend.error({ error: 'error fetching request' });
          if (!result.rows[0] || result.rows[0] === undefined || result.rows[0].length <= 0) {
            res.status(404).jsend.fail({ message: `There have no request to the ride with id of ${ride.id}` });
          } else {
            res.jsend.success({ request: result.rows[0] });
          }
        });
      });
    } else {
      const sql = 'SELECT * FROM requests WHERE ride_id = $1';
      pool((err, client, done) => {
        if (err) res.status(500).jsend.error({ message: 'error connecting to database' });

        client.query(sql, [ride.id], (error, result) => {
          done();
          if (error) return res.status(400).jsend.error({ error: 'error getting request' });
          if (!result || result === undefined || result.rows.length === 0) {
            res.status(404).jsend.fail({ status: 'fail', message: 'you have no request to this ride' });
          } else {
            res.jsend.success({ requests: result.rows });
          }
        });
      });
    }
  }

  /**
   * Delete request to ride
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof requestController
   */
  static deleteRequest(req, res) {
    if (req.currentUser.id !== req.request.user_id) {
      res.status(403).jsend.fail({ message: 'you don\'t have the priviledge to access this endpoint ' });
    }
    const alterRide = () => {
      const sql = 'UPDATE rides SET slot = $1 WHERE id = $2';
      pool((err, client, done) => {
        if (err) res.status(500).jsend.error({ message: 'error connecting to database' });
        client.query(sql, [req.ride.slot + 1, req.ride.id], (error) => {
          done();
          if (error) res.status(500).jsend.error({ message: 'error updating ride slot' });
        });
      });
    };
    const sql = 'DELETE FROM requests WHERE id = $1';
    pool((err, client, done) => {
      if (err) res.status(500).jsend.error({ message: 'error connecting to database' });
      client.query(sql, [req.request.id], (error) => {
        done();
        if (error) res.status(500).jsend.error({ message: 'error cancelling request' });
        alterRide();
        res.jsend.success({ message: 'you have cancelled this request' });
      });
    });
  }

  /**
   * Delete request to ride
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof requestController
   */
  static cancelRequest(req, res) {
    if (req.currentUser.id !== req.request.user_id) {
      res.status(403).jsend.fail({ message: 'you don\'t have the priviledge to access this endpoint ' });
    }
    const alterRide = () => {
      const sql = 'UPDATE rides SET slot = $1 WHERE id = $2';
      pool((err, client, done) => {
        if (err) res.status(500).jsend.error({ message: 'error connecting to database' });
        client.query(sql, [req.ride.slot + 1, req.ride.id], (error) => {
          done();
          if (error) res.status(500).jsend.error({ message: 'error updating ride slot' });
        });
      });
    };
    const sql = 'DELETE FROM requests WHERE id = $1';
    pool((err, client, done) => {
      if (err) res.status(500).jsend.error({ message: 'error connecting to database' });
      client.query(sql, [req.request.id], (error) => {
        done();
        if (error) res.status(500).jsend.error({ message: 'error cancelling request' });
        alterRide();
        res.jsend.success({ message: 'you have cancelled this request' });
      });
    });
  }
}
export default requestController;
