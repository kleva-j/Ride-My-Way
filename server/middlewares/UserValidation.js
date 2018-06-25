import { isEmpty } from 'lodash';
import Validator from 'validator';

/**
 * @class Auth
 * @classdesc Auths user input
 */
class Auth {
  /**
   * Authenticate Login
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next Middleware
   * @return {object} Message and user data
   * @memberof Auth
   */
  static AuthLogin(req, res, next) {
    const { email, password } = req.body;
    const error = {};

    if (!password) {
      error.password = 'Password is required';
    }

    if (password && Validator.isEmpty(password.trim() || '')) {
      error.password = 'Password is required';
    }

    if (!email) {
      error.email = 'Email is required';
    }

    if (email && !Validator.isEmail(email.trim() || '')) {
      error.email = 'Please provide a valid email address';
    }

    if (isEmpty(error)) return next();
    return res.status(400).json({ error });
  }

  /**
   * Authentcate Signup
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next Middleware
   * @return {object} Message and user data
   * @memberof Auth
   */
  static AuthSignUp(req, res, next) {
    const {
      username, email, password, confirmPassword
    } = req.body;
    const error = {};

    if (!username) {
      error.username = 'Username is required';
    }

    if (username && Validator.isEmpty(username.trim() || '')) {
      error.username = 'Username is required';
    }

    if (!password) {
      error.password = 'Password is required';
    }

    if (!confirmPassword) {
      error.password = 'Please confirm your password';
    }

    if (Validator.isEmpty(password || '') ||
      Validator.isEmpty(confirmPassword || '') ||
      (confirmPassword.trim() !== password.trim())) {
      error.password = 'Passwords do not match or empty';
    }

    if (!email) {
      error.email = 'Email is required';
    }

    if (email && !Validator.isEmail(email.trim() || '')) {
      error.email = 'Email address is empty or invalid';
    }

    if (isEmpty(error)) return next();
    return res.status(400).json({ error });
  }

  /**
   * Authentcate InputLength
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next Middleware
   * @return {object} Message and user data
   * @memberof Auth
   */
  static AuthInputLength(req, res, next) {
    const {
      username, password
    } = req.body;

    // check for username characters
    if (!Validator.isAlphanumeric(username)) {
      return res.status(406)
        .send({
          status: 'Fail',
          message: 'Only alphabets and numbers are allowed.',
        });
    }
    // Check for Username Lenght
    if (!Validator.isLength(username, { min: 3, max: 15 })) {
      return res.status(406)
        .send({
          status: 'Fail',
          message: 'Username can only be from 3 to 15 characters',
        });
    }
    // Check for Password
    if (!Validator.isLength(password, { min: 6, max: 50 })) {
      return res.status(406)
        .send({
          status: 'Fail',
          message: 'Password can only be from 6 to 12 characters',
        });
    }
    next();
  }
}

export default Auth;
