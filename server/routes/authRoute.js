import express from 'express';
import Validate from '../middlewares/validate';
import userController from '../controllers/userController';

const {
  validateSignupData,
  validateLoginData,
  AuthSignupInputLength
} = Validate;

const { RegisterUser, loginUser } = userController;

const authRouter = express.Router();

authRouter.route('/login')
  .post(validateLoginData, loginUser);
authRouter.route('/signup')
  .post(validateSignupData, AuthSignupInputLength, RegisterUser);

export default authRouter;
