import express from 'express';
import UsersController from './users-controller';

const userRouter = express.Router();

userRouter.post('/', UsersController.createUser);
userRouter.get('/', UsersController.getUsers);

export default userRouter;
