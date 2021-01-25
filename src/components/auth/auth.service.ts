import jwt from 'jsonwebtoken';

const authService = {
  createToken: (email: string) =>
    jwt.sign({ email }, process.env.TOKEN_SECRET as string, {
      expiresIn: process.env.TOKEN_EXPIRES,
    }),
};
export default authService;
