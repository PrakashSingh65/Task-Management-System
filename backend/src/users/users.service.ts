import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateDefaultUser() {
    try {
      let user = await this.prisma.user.findFirst();

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: 'dexter@gmail.com',
            fullName: 'Dexter',
            title: 'Designer',
            username: 'Dexuser',
            theme: 'light',
            colorMode: 'Blue',
          },
        });
      }
      return user;
    } catch (error) {
      console.error('Error in getOrCreateDefaultUser:', error);
      throw new InternalServerErrorException('Database user operation failed');
    }
  }

  async updateUser(id: string, data: any) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error('Error in updateUser:', error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }
}