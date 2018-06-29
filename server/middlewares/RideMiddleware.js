/**
 * @class RideValidator
 * @classdesc Validates request params to request for rides.
 */
class RideValidator {
  /**
   *  validate date
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware
   * @memberof RideValidator
   */
  static validateDate (req, res, next){
    const { date } = req.body;
    let stat = date.split('-').join(',');
    let error;

    if(!date) {
      error.date = 'A Valid Date is required'
    }

    if(!(/[a-z]/g).test(stat)){
      error.message = 'Please input a valid date'
    }

    if(!error) next();
    res.status(400).json({ error });
  }

  /**
   *  validate stop
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware
   * @memberof RideValidator
   */
  static validateDestination (req, res, next){
    const { stop } = req.body;
    let error;

    if(!stop) {
      error.stop = 'Valid Date is required'
    }

    if(date.match(/w/g) !== date){
      error.message = 'please input a valid location'
    }

    if(!error) next();
    res.status(400).json({ error });
  }
    /**
   *  validate id
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware
   * @memberof RideValidator
   */
  static validateID (req, res, next) {
    const rideId = parseInt(req.params.rideId, 10);
    if(isNaN(rideId)) res.status(400).json({
      message: 'Please enter a valid numbers'
    })
    next();
  }

}
