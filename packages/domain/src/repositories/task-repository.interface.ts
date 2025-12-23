import { Result } from '../core/result';
import { Task } from '../entities/task';

export interface TaskRepositoryInterface {
  findAll(): Promise<Result<Task[]>>;
}

