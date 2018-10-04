import uuid from 'uuid/v4';
import jwt from 'jsonwebtoken';
import pool from './../config/config';
import crypto from '../middlewares/crypto';

const { encrypt, decrypt } = crypto;

/**
 * @class userController
 * @classdesc Implements user registration and signin process
 */
class userController {
  /**
   * Register new user
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof userController
   */
  static RegisterUser(req, res) {
    const {
      fullname, username, email, password
    } = req.body;

    const hash = encrypt(password);

    const query = {
      text: 'INSERT INTO users (id, fullname, username, password, email) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [uuid(), fullname.toLowerCase(), username.toLowerCase(), hash, email]
    };

    pool((err, client, done) => {
      if (err) res.status(500).jsend.error({ message: 'Internal server error' });
      client.query(query, (error, response) => {
        done();
        if (error) res.status(400).jsend.error({ message: 'Error creating ride' });
        const user = response.rows[0];
        const token = jwt.sign({
          userId: user.id,
          username: user.username,
          email: user.email
        }, process.env.SECRET, { expiresIn: '1 day' });
        res.status(200).jsend.success({ message: 'user is signed up successfully', token });
      });
    });
  }

  /**
   * login user
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof userController
   */
  static loginUser(req, res) {
    const { email, password } = req.body;
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    };

    pool((err, client, done) => {
      if (err) res.status(500).jsend.error({ message: 'Internal server error' });
      client.query(query, (err, response) => {
        done();
        if (err) res.status(500).jsend.error({ message: 'Error connecting to database' });
        if (response) {
          if (response.rows.length === 0) {
            res.status(400).jsend.fail({
              message: 'Email or password is incorrect',
            });
          } else {
            const user = response.rows[0];
            const checkpass = decrypt(password, user.password);
            if (checkpass) {
              const token = jwt.sign({
                userId: user.id,
                username: user.username,
                email: user.email,
              }, process.env.SECRET, { expiresIn: '1 day' });
              res.status(200).jsend.success({
                message: `User ${user.username} logged in seccessfully`,
                id: user.id,
                username: user.username,
                email: user.email,
                token
              });
            } else res.status(401).jsend.fail({ message: 'Password is incorrect' });
          }
        }
      });
    });
  }

  /**
   * update user
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Message and user data
   * @memberof userController
   */
  static updateUser(req, res) {
    const { id, password, newPassword } = req.body;

    if (!newPassword || password === [null || undefined]) {
      res.status(400).jsend.fail({ message: 'Old and new password fields are empty' });
    } else {
      const sql1 = 'SELECT * FROM users WHERE id = $1';
      const sql2 = 'UPDATE user SET password = $1 WHERE id = $2';
      const updatePass = () => {
        pool((err, client, done) => {
          if (err) res.status(401).jsend.error({ message: 'Internal server error' });
          client.query(sql2, [newPassword, id], (err) => {
            done();
            if (err) res.status(401).jsend.error({ message: 'Unable to complete request' });
            res.status(200).jsend.success({ message: 'password successfully updated' });
          });
        });
      };
      pool((err, client, done) => {
        if (err) res.status(400).jsend.error({ message: 'Internal server error' });
        client.query(sql1, [id], (err, user) => {
          done();
          if (err) res.status(400).jsend.error({ message: 'Error connecting to database' });
          if (!user || user.rows.length <= 0) res.status(403).jsend.fail({ message: 'Incorrect password' });
          else {
            bcrypt.compare(password, user.rows[0].password, (err, isMatch) => {
              if (isMatch) updatePass();
            });
          }
        });
      });
    }
  }
}

export default userController;
