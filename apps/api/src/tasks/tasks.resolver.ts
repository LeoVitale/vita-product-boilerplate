import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Mutation(() => Task)
  async createTask(
    @Args('title') title: string,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<Task> {
    return this.tasksService.create(title, description);
  }

  @Mutation(() => Task)
  async deleteTask(@Args('id', { type: () => ID }) id: string): Promise<Task> {
    return this.tasksService.delete(id);
  }

  @Mutation(() => Task)
  async toggleTaskComplete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Task> {
    return this.tasksService.toggleComplete(id);
  }
}
