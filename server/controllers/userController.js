// /**
//  * @class userController
//  * @classdesc Implements user being able to create a ride offer, get specific ride offer.
//  * make a request to join a ride
//  */
// class userController {
//   /**
//    * create ride offer
//    *
//    * @static
//    * @param {object} req - The request object
//    * @param {object} res - The response object
//    * @return {object} Message and user data
//    * @memberof userController
//    */
//   static RegisterUser(req, res) {
//     const {
//       userid, firstname, lastname, username, email, password
//     } = req.body;
//     const hashPassword = SHA256(password).toString();

//     const text = 'INSERT INTO users( userid, firstname, lastname, username, email, password, hashpassword) VALUES($1, $2, $3, $4, $5, $6, $7)  RETURNING *';
//     const values = [userid, firstname, lastname, username, email, password, hashPassword];

//     pool.query(text, values, (err, resp) => {
//       console.log('i am here');
//       if (err) {
//         console.log('An error occurred');
//         return err.stack;
//       }
//       if (resp) {
//         res.status(201).json({
//           message: 'Signed in successfully!',
//           data: resp.rows[0]
//         });
//       }
//     });
//     // pool.connect()
//     //   .then(client => client.query('SELECT * FROM users WHERE id = $1', [1])
//     //     .then((res) => {
//     //       client.release();
//     //       console.log(res.rows[0]);
//     //     })
//     //     .catch((e) => {
//     //       client.release();
//     //       console.log(err.stack);
//     //     }));
//   }

//   /**
//    * Register User
//    *
//    * @static
//    * @param {object} req - The request object
//    * @param {object} res - The response object
//    * @return {object} Message and ride data
//    * @memberof userController
//    */
//   static SignInUser(req, res) {
//     // const { email, password } = req.body;

//     res.status(202).json({
//       message: 'User signed in successfully'
//     });
//   }
// }

//       // if(logUser) {
//         // res.status(202).json({
//           // message: 'User signed in successfully',
//           // data: logUser
//         // });
//       // }
//       // else {
//         // res.status(404).json({
//           // status: 'fail',
//           // message: 'Incorrect Email or password'
//         // });
//   /**
//    * Get User
//    *
//    * @static
//    * @param {object} req - The request object
//    * @param {object} res - The response object
//    * @return {object} Message and ride data
//    * @memberof userController
//    */
//     static getUser(req, res) {
//       // const usernameparams = req.params.username.toString();
//       const getrides = (username) => {
//         const sql = `SELECT * FROM "public"."users" LIMIT 100`;
//         pool((err, client, done) => {
//           if (err) return res.status(400).jsend.error({
//             message: 'error connecting to the database'
//           });

//           client.query(sql, (error, result) => {
//             done();
//             if (error) return res.status(400).jsend.error({
//               message: 'wrong input parsed as parameter id'
//             });
//             if (
//               !result.rows ||
//               result.rows === null ||
//               result.rows === undefined ||
//               result.rows.length < 0
//             ) {
//               console.log('no rows returned')
//             } else {
//               console.log(results);
//             }
//           });
//         });
//       };
//     }
// }
// export default userController;