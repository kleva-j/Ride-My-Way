import express from 'express';
import userController from './userController';
import verifyLogin from './authLogin';
import Validate from './validate';

const { RegisterUser, loginUser, updateUser } = userController;
const {
  validateSignupData,
  validateLoginData,
  AuthSignupInputLength
} = Validate;

const userRouter = express.Router();

userRouter.route('/login')
  .post(validateLoginData, loginUser);
userRouter.route('/signup')
  .post(validateSignupData, AuthSignupInputLength, RegisterUser);
userRouter.route('/user/update')
  .post(verifyLogin, updateUser);

export default userRouter;
