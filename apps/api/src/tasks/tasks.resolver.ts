import { Resolver, Query } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task])
  tasks(): Task[] {
    return this.tasksService.findAll();
  }
}
