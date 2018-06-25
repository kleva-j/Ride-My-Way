import express from 'express';
import Auth from '../middlewares/UserValidation';
import userController from '../controllers/userController';

const { AuthInputLength, AuthLogin, AuthSignUp } = Auth;

const { RegisterUser, SignInUser } = userController;

const userRouter = express.Router();

userRouter.route('/login')
  .post(AuthLogin, SignInUser);
userRouter.route('/signup')
  .post(AuthInputLength, AuthSignUp, RegisterUser);
