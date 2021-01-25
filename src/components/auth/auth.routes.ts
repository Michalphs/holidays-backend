import express from 'express';
import passport from 'passport';
import AuthController from './auth.controller';
import validation from '../../middlewares/validation';
import { authLoginSchema } from './auth.schemas';

const authRouter = express.Router();

authRouter.post(
  '/login',
  [validation(authLoginSchema), passport.authenticate('local', { session: true })],
  AuthController.login
);
authRouter.post('/register', validation(authLoginSchema), AuthController.register);

export default authRouter;
