import { Task } from '../entities/task';

export interface TaskRepositoryInterface {
  list(): Promise<Task[]>;
}

