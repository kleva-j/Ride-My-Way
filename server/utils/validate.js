import validator from 'validator';

/**
 * @class Validate
 * @classdesc validates an input
 */
class Validate {
  /**
   * @static
   * @param {object} req - the request object
   * @param {object} res - the response object
   * @param {object} next - the next middleware
   * @return {object} - returns results of the validation
   * @memberof validation
   */
  static validateSignupData(req, res, next) {
    const { password } = req.body;
    req.checkBody('fullname', 'fullname is required').notEmpty();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'A valid Email is required').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(password);

    // Get Errors
    const errors = req.validationErrors();
    if (errors) res.status(406).jsend.fail({ errors });
    else next();
  }

  /**
   * @static
   * @param {object} req - the request object
   * @param {object} res - the response object
   * @param {object} next - the next middleware
   * @return {object} - returns results of the validation
   * @memberof validation
   */
  static validateLoginData(req, res, next) {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'A valid Email is required').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    // Get Errors
    const errors = req.validationErrors();
    if (errors) res.status(406).jsend.fail({ errors });
    else next();
  }

  /**
   * @static
   * @param {*} req - the request object
   * @param {*} res - the response object
   * @param {*} next - the next middleware
   * @return {object} - return result of the validation
   * @memberof Validate
   */
  static validateInput(req, res, next) {
    req.checkBody('location', 'location is required').notEmpty();
    req.checkBody('destination', 'destination is required').notEmpty();
    req.checkBody('seats', 'seats is required').notEmpty();
    req.checkBody('time', 'time is required').notEmpty();
    req.checkBody('carModel', 'carModel is required').notEmpty();
    req.checkBody('departureDate', 'takeOf Date is required').notEmpty();
    req.checkBody('userId', 'userId is required').notEmpty(); // 1
    req.checkBody('driver', 'driver is required').notEmpty(); // 2

    // Get Errors
    const errors = req.validationErrors();
    if (errors) res.status(406).jsend.fail({ errors });
    else next();
  }

  /**
   * Authenticate Input Length
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next Middleware
   * @return {object} Message and user data
   * @memberof Validate
   */
  static AuthSignupInputLength(req, res, next) {
    const {
      username, password
    } = req.body;

    // check if username is alphanumeric
    if (!validator.isAlphanumeric(username)) {
      res.status(406).jsend.fail({
        message: 'username should contain only alphabets and numbers.',
      });
    }
    // Check Username Length
    if (!validator.isLength(username, { min: 6, max: 15 })) {
      res.status(406).jsend.fail({
        message: 'Username can only be from 3 to 15 characters',
      });
    }
    // Check Password Length
    if (!validator.isLength(password, { min: 6, max: 50 })) {
      res.status(406).jsend({
        message: 'Password can only be from 6 to 12 characters',
      });
    }
    next();
  }

  /**
   * Authenticate Input Length
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next Middleware
   * @return {object} Message and user data
   * @memberof Validate
   */
  static validateRequestDetails(req, res, next) {
    req.checkBody('riderID', 'rider\'s details are required');
    req.checkBody('riders', 'list of the riders are required');
    req.checkParams('rideID', 'ride\'s details are required');
    req.checkBody('seats', 'The numbers of seats are required');
    const { seats, riderID } = req.body;
    if (!validator.isInt(seats)) res.status(406).jsend.fail({ message: 'The number of seats should be a valid Integre' });
    if (!validator.isUUID(riderID)) res.status(406).jsend.fail({ message: 'Rider\'s ID should be a valid UUID number' });

    // Check for errors
    const errors = req.validationErrors();
    if (errors) res.status(406).jsend.fail({ errors });
    else next();
  }
}

export default Validate;
