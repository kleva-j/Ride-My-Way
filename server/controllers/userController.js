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
    const {
      firstname, lastname, username, email, password
    } = req.body;

    users.forEach(user => {
      if(user.email = email) {
        return re.status().json({
          message: `User already exist with the email address of ${email}`
        })
      }
    })
    const hashPassword = SHA256(req.body.password).toString();
    const newUser = {
      id: users[users.length - 1].id + 1,
      firstname,
      lastname,
      username,
      email,
      password,
      hashPassword
    };
    users.push(newUser);
    res.status(201).json({
      message: 'Signed up successfully!',
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
