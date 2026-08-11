import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

let memoryTasks: any[] = [];

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { search?: string; priority?: string; status?: string }) {
    const { search, priority, status } = query;

    try {
      return await this.prisma.task.findMany({
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
    } catch (error) {
      console.warn('Prisma DB unavailable, using in-memory tasks store');
      let tasks = [...memoryTasks];
      if (status) {
        tasks = tasks.filter((t) => t.status === status.toUpperCase());
      }
      if (priority) {
        tasks = tasks.filter((t) => t.priority === priority.toUpperCase().replace(' ', '_'));
      }
      if (search) {
        tasks = tasks.filter((t) => t.title?.toLowerCase().includes(search.toLowerCase()));
      }
      return tasks;
    }
  }

  async create(data: any) {
    try {
      return await this.prisma.task.create({ data });
    } catch (error) {
      console.warn('Prisma DB unavailable, creating task in-memory');
      const newTask = {
        id: `task-${Date.now()}`,
        title: data.title,
        description: data.description || '',
        status: data.status || 'TODO',
        priority: data.priority || 'NO_PRIORITY',
        dueDate: data.dueDate || null,
        tags: data.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryTasks.unshift(newTask);
      return newTask;
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.warn('Prisma DB unavailable, updating task in-memory');
      const idx = memoryTasks.findIndex((t) => t.id === id);
      if (idx !== -1) {
        memoryTasks[idx] = { ...memoryTasks[idx], ...data, updatedAt: new Date().toISOString() };
        return memoryTasks[idx];
      }
      return { id, ...data };
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch (error) {
      console.warn('Prisma DB unavailable, removing task from in-memory store');
      memoryTasks = memoryTasks.filter((t) => t.id !== id);
      return { id };
    }
  }
}