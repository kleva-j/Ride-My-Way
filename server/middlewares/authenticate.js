/**
 * @class Validate
 * @classdesc validates an input
 */
 class Validate {
  /**
   * @static
   * @param {object} obj - the object to be validated
   * @return {boolean} - returns results of the validation
   * @memberof validation
   */
  static isEmpty(obj) {
      for (var prop in obj) return false;
      return true;
  }

   /**
   * @static
   * @param {object} obj - the object to be validated
   * @return {boolean} - returns results of the validation
   * @memberof validation
   */
  static isAlphanumeric(obj) {
    const regEx = /^\w+$/i;
    return regEx.test(obj);
  }

  /**
   * @static
   * @param {object} obj - the object to be validated
   * @param {object} range - the length range of the object
   * @return {boolean} - returns results of the validation
   * @memberof validation
   */
  static isLength(obj, range) {
    const { min, max } = range;
    if(obj.length > min){
      if(obj.length < max) return true;
      return false;
    }
    return false;
  }

  /**
   * @static
   * @param {object} obj - the object to be validated
   * @return {boolean} - returns results of the validation
   * @memberof validation
   */
  static isEmail(email) {
    const regEx = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    return regEx.test(email);
  }
}

export default Validate;
