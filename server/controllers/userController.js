// import model from '../dummyModels/index';
import SHA256 from 'crypto-js/sha256';
import pool from '../db/dbpool';

// const { users } = model;

/**
 * @class userController
 * @classdesc Implements user being able to create a ride offer, get specific ride offer.
 * make a request to join a ride
 */
class userController {
  /**
   * create ride offer
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof userController
   */
  static RegisterUser(req, res) {
    const {
      firstname, lastname, username, email, password
    } = req.body;

    const hashPassword = SHA256(req.body.password).toString();

    pool.connect(connect, ( err, client, done ) => {
      if(err) {
        return console.error('error fetching client from pool');
      }
      client.query('SELECT * FROM users', (err, response) => {
        done();
        if (err) {
          return console.error('error running query', err);
        }

        res.status(200).json({
          data: response.rows
        })

        done()
      })
    })
  }

  /**
   * Register User
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and ride data
   * @memberof userController
   */
  static SignInUser(req, res) {
    const { email, password } = req.body;
    let logUser;
      users.forEach((user) => {
        if(user.email === email && user.password === password) {
          logUser = user;
        }
      });

      if(logUser) {
        res.status(202).json({
          message: 'User signed in successfully',
          data: logUser
        });
      }
      else {
        res.status(404).json({
          status: 'fail',
          message: 'Incorrect Email or password'
        });
      }
    }
}

export default userController;
