/**
 * @class RideValidator
 * @classdesc Validates request params to request for rides.
 */
class RideValidator {
  /**
   *  validate input
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware
   * @memberof RideValidator
   */
  static validateInput (req, res, next){
    const { start, date, stop, driver } = req.body;
    let date = date.split('-').join(',');
    let error;

    if(!start) {
      error.start = 'A Location is required'
    }

    if(start.match(/w/g) !== date){
      error.stop = 'please input a valid destination'
    }

    if(start && start.length < 3){
      error.start.length = 'Please enter a valid input length is required'
    }

    if(!date) {
      error.date = 'A Date is required'
    }

    if(!(/[a-z]/g).test(stat)){
      error.date = 'Please input a valid date'
    }

    if(!stop) {
      error.stop = 'A Destination is required'
    }

    if(stop.match(/w/g) !== date){
      error.stop = 'please input a valid destination'
    }
    if(stop && stop.length < 3){
      error.stop.length = 'Please enter a valid input length is required'
    }

    if(!driver) {
      error.driver = `Driver's details are required`
    }
    const { name, gender, id } = req.body;
    if( name && gender && id ) {
      error.driver = `Valid 'NAME', 'GENDER', and 'ID' are required`
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

export default RideValidator;