import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  createUser: async (req: Request, res: Response) => {
    const { email, firstName, lastName } = req.body;

    try {
      const user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
        },
      });

      res.json(user);
    } catch (err) {
      res.json(err);
    }
  },

  getUsers: async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();

    res.json({ users });
  },
};
