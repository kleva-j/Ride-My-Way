/**
 * @class RideValidator
 * @classdesc Validates request params to request for rides.
 */
class RideValidator {
  /**
   *  validate date
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
}
