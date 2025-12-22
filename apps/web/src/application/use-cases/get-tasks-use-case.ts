import { Task } from '@/domain/entities/task';
import { TaskRepositoryInterface } from '@/domain/repositories/task-repository-interface';

export interface IGetTasks {
  execute(): Promise<Task[]>;
}

export class GetTasks implements IGetTasks {
  constructor(private repo: TaskRepositoryInterface) {}

  execute(): Promise<Task[]> {
    return this.repo.list();
  }
}

