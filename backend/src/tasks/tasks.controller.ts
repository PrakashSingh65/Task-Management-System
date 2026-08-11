import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query('search') search?: string,
    @Query('priority') priority?: string,
    @Query('status') status?: string,
  ) {
    return this.tasksService.findAll({ search, priority, status });
  }

  @Post()
  createTask(@Body() body: any) {
    return this.tasksService.create(body);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: any) {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}