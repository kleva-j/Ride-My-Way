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
    const hashPassword = SHA256(password).toString();

    // const text = 'INSERT INTO users(firstname, lastname, username, email, password, hashpassword) VALUES($1, $2, $3, $4, $5, $6)  RETURNING *';
    // const values = [firstname, lastname, username, email, password, hashPassword];

    // pool.query(text, values, (err, resp) => {
    //   if (err) return err.stack;

    //   res.status(201).json({
    //     message: 'Signed in successfully!',
    //     data: resp.rows[0]
    //   });
    // });
    pool.connect()
      .then(client => client.query('SELECT * FROM users WHERE id = $1', [1])
        .then((res) => {
          client.release();
          console.log(res.rows[0]);
        })
        .catch((e) => {
          client.release();
          console.log(err.stack);
        }));
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
    // const { email, password } = req.body;

    res.status(202).json({
      message: 'User signed in successfully'
    });
  }
}

export default userController;
