import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(title: string, description?: string): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title,
        description,
      },
    });
  }

  async delete(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async toggleComplete(id: string): Promise<Task> {
    const task = await this.prisma.task.findUniqueOrThrow({ where: { id } });
    return this.prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });
  }
}
