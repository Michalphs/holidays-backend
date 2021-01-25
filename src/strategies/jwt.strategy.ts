import { Strategy, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';
import UsersService from '../components/users/users.service';

const opts: StrategyOptions = {
  jwtFromRequest: (req: Request) => req.cookies.jwt,
  secretOrKey: process.env.TOKEN_SECRET,
};

const JwtStrategy = new Strategy(opts, async (payload, done) => {
  try {
    const user = await UsersService.getUserByEmail(payload.email);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error);
  }
});

export default JwtStrategy;
