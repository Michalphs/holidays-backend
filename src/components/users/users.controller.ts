import { Request, Response } from 'express';
import UserService from './users.service';

export default {
  getMe: async (req: Request, res: Response) => {
    try {
      const user = await UserService.getUserByEmail(req.body.email);
      const { password, ...me } = user;

      res.status(200).json({ me });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
