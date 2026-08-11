import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Default User Fetch / Create (Dexter)
  async getOrCreateDefaultUser() {
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
  }

  // Update Profile Info & Preferences
  async updateUser(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}