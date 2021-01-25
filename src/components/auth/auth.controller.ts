import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import authService from './auth.service';

const prisma = new PrismaClient();

export default {
  login: (req: Request, res: Response) => {
    const { email } = req.body;
    const token = authService.createToken(email);
    res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.TOKEN_EXPIRES as any });
    res.status(200).send();
  },

  register: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      const { password: p, ...result } = newUser;

      res.status(201).json({ user: result });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
