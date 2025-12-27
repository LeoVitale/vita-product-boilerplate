import { TaskRepositoryInterface } from '@repo/domain';
import {
  GetTasksUseCase,
  IGetTasksUseCase,
} from '../use-cases/get-tasks.use-case';
import {
  CreateTaskUseCase,
  ICreateTaskUseCase,
} from '../use-cases/create-task.use-case';
import {
  ToggleTaskUseCase,
  IToggleTaskUseCase,
} from '../use-cases/toggle-task.use-case';
import {
  DeleteTaskUseCase,
  IDeleteTaskUseCase,
} from '../use-cases/delete-task.use-case';

/**
 * Factory function to create GetTasksUseCase with injected dependencies
 *
 * @param repository - TaskRepositoryInterface implementation
 * @returns Configured GetTasksUseCase instance
 */
export function createGetTasksUseCase(
  repository: TaskRepositoryInterface,
): IGetTasksUseCase {
  return new GetTasksUseCase(repository);
}

/**
 * Factory function to create CreateTaskUseCase with injected dependencies
 *
 * @param repository - TaskRepositoryInterface implementation
 * @returns Configured CreateTaskUseCase instance
 */
export function createCreateTaskUseCase(
  repository: TaskRepositoryInterface,
): ICreateTaskUseCase {
  return new CreateTaskUseCase(repository);
}

/**
 * Factory function to create ToggleTaskUseCase with injected dependencies
 *
 * @param repository - TaskRepositoryInterface implementation
 * @returns Configured ToggleTaskUseCase instance
 */
export function createToggleTaskUseCase(
  repository: TaskRepositoryInterface,
): IToggleTaskUseCase {
  return new ToggleTaskUseCase(repository);
}

/**
 * Factory function to create DeleteTaskUseCase with injected dependencies
 *
 * @param repository - TaskRepositoryInterface implementation
 * @returns Configured DeleteTaskUseCase instance
 */
export function createDeleteTaskUseCase(
  repository: TaskRepositoryInterface,
): IDeleteTaskUseCase {
  return new DeleteTaskUseCase(repository);
}

/**
 * Creates all task-related use cases with a single repository
 *
 * Convenience function for creating all use cases at once in the Composition Root.
 *
 * @param repository - TaskRepositoryInterface implementation
 * @returns Object containing all configured use case instances
 */
export function createTaskUseCases(repository: TaskRepositoryInterface) {
  return {
    getTasksUseCase: createGetTasksUseCase(repository),
    createTaskUseCase: createCreateTaskUseCase(repository),
    toggleTaskUseCase: createToggleTaskUseCase(repository),
    deleteTaskUseCase: createDeleteTaskUseCase(repository),
  };
}
