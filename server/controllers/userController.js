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

    // users.forEach(user => {
    //   if(user.email = email) {
    //     return re.status().json({
    //       message: `User already exist with the email address of ${email}`
    //     })
    //   }
    // })
    // const hashPassword = SHA256(req.body.password).toString();
    // const newUser = {
    //   id: users[users.length - 1].id + 1,
    //   firstname,
    //   lastname,
    //   username,
    //   email,
    //   password: hashPassword
    // };
    // users.push(newUser);
    // res.status(201).json({
    //   message: 'Signed in successfully!',
    //   data: users[users.length - 1]
    // });
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
      // users.forEach((user) => {
        // if(user.email === email && user.password === password) {
          // logUser = user;
        // }
      // });

      // if(logUser) {
        // res.status(202).json({
          // message: 'User signed in successfully',
          // data: logUser
        // });
      // }
      // else {
        // res.status(404).json({
          // status: 'fail',
          // message: 'Incorrect Email or password'
        // });
      }
  /**
   * Get User
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and ride data
   * @memberof userController
   */
    static getUser(req, res) {
      // const usernameparams = req.params.username.toString();
      const getrides = (username) => {
        const sql = `SELECT * FROM "public"."users" LIMIT 100`;
        pool((err, client, done) => {
          if (err) return res.status(400).jsend.error({
            message: 'error connecting to the database'
          });

          client.query(sql, (error, result) => {
            done();
            if (error) return res.status(400).jsend.error({
              message: 'wrong input parsed as parameter id'
            });
            if (
              !result.rows ||
              result.rows === null ||
              result.rows === undefined ||
              result.rows.length < 0
            ) {
              console.log('no rows returned')
            } else {
              console.log(results);
            }
          });
        });
      };
    }
}
export default userController;