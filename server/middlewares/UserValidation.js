import Validator from './authenticate';
const {isEmpty} = Validator;
/**
 * @class Auth
 * @classdesc Authenticates user input
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

    //validate password
    if (!password) {
      error.password = 'Password is required';
    }

    if (password && Validator.isEmpty(password.trim() || '')) {
      error.password = 'Password is required';
    }

    //validate password
    if (!email) {
      error.email = 'Email is required';
    }

    if (email && !Validator.isEmail(email.trim() || '')) {
      error.email = 'Please provide a valid email address';
    }

    if (isEmpty(error)) {
      next();
    } else res.status(400).json({ error });
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
      firstname, lastname, username, email, password, confirmPassword
    } = req.body;
    const error = {};

    if (!firstname) {
      error.firstname = 'A Firstname is required';
    }

    if (!lastname) {
      error.lastname = 'A Lastname is required';
    }

    if (!username) {
      error.username = 'A Username is required';
    }

    if (username && Validator.isEmpty(username.trim() || '')) {
      error.username = 'A Username is required';
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
      error.password = 'Passwords field is empty';
    }

    if (!email) {
      error.email = 'An Email Address is required';
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
    if (!Validator.isLength(username, { min: 4, max: 15 })) {
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
