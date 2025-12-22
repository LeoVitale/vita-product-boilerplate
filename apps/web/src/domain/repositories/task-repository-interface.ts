import { Task } from '@/domain/entities/task';

export interface TaskRepositoryInterface {
  list(): Promise<Task[]>;
}

