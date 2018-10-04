import express from 'express';
import userController from '../controllers/userController';
import verifyLogin from '../middlewares/authLogin';

const { updateUser } = userController;

const userRouter = express.Router();

userRouter.route('/user/update')
  .post(verifyLogin, updateUser);

export default userRouter;
