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
    let error = {};

    //start
    if(!start) {
      error.start = 'A Location is required';
    }

    if((/[1-9]/g).test(start)){
      error.start = 'please input a valid Location'
    }

    if(start && start.length < 3){
      error.start = {length: 'The Location should be between 3 to 20 characters'}
    }

    //date
    if(!date) {
      error.date = 'A Date is required'
    }

    if(date){
      let formatedDate = date.split('-').join(',');
      if((/[a-z]/g).test(formatedDate)){
        error.date = 'Please input a valid date'
      }
    }

    //stop
    if(!stop) {
      error.stop = 'A Destination is required'
    }

    if((/\W/g).test(stop)){
      error.stop = 'please input a valid Destination'
    }

    if(stop && stop.length < 3){
      error.stop = {length: 'Please enter a valid length of Destination'}
    }

    //driver
    if(!driver) {
      error.driver = `Driver's details are required`
    }
    const { name, gender, id } = req.body;
    if (name && gender && id) {
      error.driver = 'Valid \'NAME\', \'GENDER\', and \'ID\' are required';
    }
    const isEmpty = (obj) => {
      for (var prop in obj) { return false; }
      return true;
    }

    if(isEmpty(error)) next()
    res.status(400).json({ error });
  }

  /**
   *  Validate Id
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware
   * @returns {object}
   * @memberof RideValidator
   */
  static validateID(req, res, next) {
    const rideId = parseInt(req.params.rideId, 10);
    if (isNaN(rideId)) {
      res.status(400).json({
        message: 'Please enter a valid numbers'
      });
    }
    next();
  }
}

export default RideValidator;
