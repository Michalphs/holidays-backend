import express, { Application, json } from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import session from 'express-session';
import userRouter from './components/users/user.routes';
import authRouter from './components/auth/auth.routes';
import JwtStrategy from './strategies/jwt.strategy';
import LocalStrategy from './strategies/local.strategy';

dotenv.config();

const app: Application = express();

app.use(json());
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET as string, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(JwtStrategy);
passport.use(LocalStrategy);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// eslint-disable-next-line no-console
app.listen(process.env.PORT || 5000, () => console.log(`Server is listening on port ${process.env.PORT || 5000}!`));
