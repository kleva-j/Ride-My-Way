import pool from '../config';

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
  static makeRequest(req, res) {
    const { rideID } = req.params; // check
    const {
      riderID, rideStatus, seats, riders
    } = req.body; // check
    const { userId, username } = req.auth; // check
    const query = {
      text: 'INSERT INTO requests(rider, user_id, driver_id, ride_id) VALUES($1, $2, $3, $4) RETURNING *',
      values: [username, userId, riderID, rideID]
    };

    const afterEffect = () => {
      const query2 = {
        text: 'UPDATE rides SET requestsToJoin = array_append( requestsToJoin, $1 ) WHERE id = $2',
        values: [username, rideID]
      };
      pool((err, client, done) => {
        if (err) res.status(500).jend.error({ message: 'Internal server error' });
        client.query(query2, (error) => {
          done();
          if (error) res.status(400).jsend.error({ message: 'error creating request' });
        });
      });
    };

    if (rideStatus === 'cancelled' || rideStatus === 'completed') {
      res.status(400).jsend.fail({ message: 'Sorry, this ride is no longer available' });
    } else if (seats <= 0) {
      res.status(400).jsend.fail({ message: 'Sorry, all available seats have been taken' });
    } else if (riderID === userId) {
      res.status(403).jsend.fail({ message: 'You cannot make request to your own ride' });
    } else if (riders.includes(username)) {
      res.status(403).jsend.fail({ message: 'you have made a request to this ride already' });
    } else {
      pool((err, client, done) => {
        if (err) res.status(500).jsend.error({ message: 'Error connecting to database' });
        client.query(query, (error, response) => {
          done();
          if (error) res.status(400).jsend.error({ message: 'Error registering user' });
          afterEffect();
          res.status(200).jsend.success({ message: response.rows[0] });
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
    const { status } = req.body;
    if (req.request.status === 'Accepted') {
      return res.jsend.fail({ message: 'Your requested ride has already been accepted' });
    } else if (req.request.status === 'Rejected') {
      return res.jsend.fail({ message: 'Your requested ride has already been rejected' });
    } else if (req.currentUser.id !== req.ride.user_id) {
      return res.status(403).jsend.fail({ message: 'you don\'t have the priviledge to access this endpoint.' });
    } else if (req.ride.seats <= 0) {
      return res.status(403).jsend.fail({ message: 'Cannot accept request, there are no available seats' });
    }

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
        if (err) res.status(500).jsend.error({ message: 'Error connecting to database' });
        client.query(sql2, [req.request.rider, req.ride.id], (error, user) => {
          done();
          if (error) res.status(400).jsend.error({ message: 'Error accepting request' });
          res.jsend.success({ ride: user.rows[0] });
        });
      });
    }
  }

  /**
   * Get all requests to your ride
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof requestController
   */
  static getAllReqToYourRide(req, res) {
    const { userId } = req.auth;
    const query = {
      text: 'SELECT * FROM requests WHERE driver_id = $2',
      values: [userId]
    };
    pool((err, client, done) => {
      if (err) res.status(500).jsend.error({ message: 'error connecting to database' });

      client.query(query, (error, result) => {
        done();
        if (error) res.status(400).jsend.error({ error: 'error getting request' });
        if (!result || result === undefined || result.rows.length === 0) {
          res.status(404).jsend.fail({ status: 'fail', message: 'you have no request to this ride' });
        } else {
          res.jsend.success({ requests: result.rows });
        }
      });
    });
  }

  /**
   * Get all your requests to ride
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof requestController
   */
  static getAllYourReqToRide(req, res) {
    const { userId } = req.auth;
    const query = {
      text: 'SELECT * FROM requests WHERE user_id = $1',
      values: [userId]
    };
    pool((err, client, done) => {
      if (err) res.status(500).jsend.error({ message: 'error connecting to database' });
      client.query(query, (error, result) => {
        done();
        if (error) res.status(400).jsend.error({ message: 'error fetching request' });
        else if (!result.rows[0] || result.rows[0] === undefined || result.rows[0].length <= 0) {
          res.status(404).jsend.fail({ message: 'You have not sent any request to join a ride' });
        } else {
          res.jsend.success({ request: result.rows[0] });
        }
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
   * Cancel request to ride
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof requestController
   */
  static cancelRequest(req, res) {
    if (req.auth.userId !== req.request.user_id) {
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
   * Get single request to ride
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof requestController
   */
  static getSingleRequest(req, res) {
    const { requestId } = req.params.reqId;
    const query = {
      text: 'SELECT * FROM requests WHERE id = $1',
      values: [requestId]
    };

    pool((err, client, done) => {
      if (err) res.status(500).jsend.error({ message: 'Internal server error' });
      client.query(query, (err, result) => {
        done();
        if (err) res.status(500).jsend.error({ message: 'error sending reqeuest' });
        res.status(200).jsend.success({ message: result.rows[0] });
      });
    });
  }

  /**
   * Update request made to a ride
   *
   * @static
   * @param {*} req - The request object
   * @param {*} res - The response object
   * @return {object} Message and user data
   * @memberof requestController
   */
  static updateRequest(req) {
    const { type } = req.body;

    switch (type) {
      case 'cancel':
        this.cancelRequest();
        break;

      case 'delete':
        this.deleteRequest();
        break;

      default:
        break;
    }
  }
}
export default requestController;
