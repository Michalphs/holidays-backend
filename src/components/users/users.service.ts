import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  getUserByEmail: async (email: string): Promise<User> => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('User not found!');
    }
    return user;
  },
};
