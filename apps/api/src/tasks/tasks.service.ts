import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: '1', title: 'Initial Task (Default Arch)', completed: false },
    { id: '2', title: 'Initial Task (Default Arch)', completed: false },
    { id: '3', title: 'Initial Task (Default Arch)', completed: false },
    { id: '4', title: 'Initial Task (Default Arch)', completed: false },
    { id: '5', title: 'Initial Task (Default Arch)', completed: false },
    { id: '6', title: 'Initial Task (Default Arch)', completed: false },
    { id: '7', title: 'Initial Task (Default Arch)', completed: false },
    { id: '8', title: 'Initial Task (Default Arch)', completed: false },
    { id: '9', title: 'Initial Task (Default Arch)', completed: false },
    { id: '10', title: 'Initial Task (Default Arch)', completed: false },
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
