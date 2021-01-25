import express from 'express';
import passport from 'passport';
import UsersController from './users.controller';

const userRouter = express.Router();

userRouter.get('/me', passport.authenticate('jwt', { session: false }), UsersController.getMe);

export default userRouter;
