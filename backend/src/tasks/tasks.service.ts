import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { search?: string; priority?: string; status?: string }) {
    const { search, priority, status } = query;

    return this.prisma.task.findMany({
      where: {
        ...(status && { status: status.toUpperCase() as any }),
        ...(priority && { priority: priority.toUpperCase().replace(' ', '_') as any }),
        ...(search && {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: any) {
    return this.prisma.task.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}