import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: '1', title: 'Initial Task (Default Arch)', completed: false },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  create(title: string): Task {
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }
}

