import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { User } from '@prisma/client';
import UsersService from '../components/users/users.service';

const LocalStrategy = new Strategy({ usernameField: 'email' }, async (email: string, password: string, done) => {
  try {
    const user = await UsersService.getUserByEmail(email);
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return done(null, user);
    }
    return done({ message: 'Bad credentials' }, null);
  } catch (error) {
    return done(error);
  }
});
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: User, done) => {
  try {
    const foundedUser = await UsersService.getUserByEmail(user.email);
    done(null, foundedUser);
  } catch (err) {
    done(err);
  }
});

export default LocalStrategy;
