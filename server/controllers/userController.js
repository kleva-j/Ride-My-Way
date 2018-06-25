import model from '../dummyModels/index';
import SHA256 from 'crypto-js/sha256';

const { users } = model;

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
    // if(isEmpty(v))
    const hashPassword = SHA256(req.body.password).toString();
    const {
      firstname, lastname, username, email
    } = req.body;
    const newUser = {
      id: users[users.length - 1].id + 1,
      firstname,
      lastname,
      username,
      email,
      password: hashPassword
    };
    users.push(newUser);
    res.status(201).json({
      message: 'Signed in successfully!',
      data: users[users.length - 1]
    });
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
    res.status(202).json({
      message: 'User signed in successfully'
    });
  }
}

export default userController;
