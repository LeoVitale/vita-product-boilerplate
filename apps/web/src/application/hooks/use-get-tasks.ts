import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Task } from '../../domain/entities/task';
import { GetTasks } from '../use-cases/get-tasks-use-case';
import { TaskRepositoryImpl } from '../../infrastructure/repositories/task-repository-impl';

const getTasksUseCase = new GetTasks(new TaskRepositoryImpl());

export function useGetTasks(
  options?: Partial<UseQueryOptions<Task[]>>
) {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasksUseCase.execute(),
    ...options,
  });
}

