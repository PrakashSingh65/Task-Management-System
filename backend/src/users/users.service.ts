import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

let memoryUser = {
  id: 'default-user-1',
  email: 'dexter@gmail.com',
  fullName: 'Dexter',
  title: 'Designer',
  username: 'Dexuser',
  theme: 'light',
  colorMode: 'Blue',
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateDefaultUser() {
    try {
      let user = await this.prisma.user.findFirst();

      if (!user) {
        user = await this.prisma.user.create({
          data: memoryUser,
        });
      }
      return user;
    } catch (error) {
      console.warn('Prisma DB unavailable, returning default user profile');
      return memoryUser;
    }
  }

  async updateUser(id: string, data: any) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.warn('Prisma DB unavailable, updating memory user profile');
      memoryUser = { ...memoryUser, ...data };
      return memoryUser;
    }
  }
}