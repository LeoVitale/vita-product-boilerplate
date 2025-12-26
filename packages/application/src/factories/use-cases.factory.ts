import { TaskRepositoryInterface } from '@repo/domain';
import {
  GetTasksUseCase,
  IGetTasksUseCase,
} from '../use-cases/get-tasks.use-case';

/**
 * Factory function to create GetTasksUseCase with injected dependencies
 *
 * This factory follows Clean Architecture by depending only on the domain interface,
 * not on infrastructure implementations. The actual repository is created in the
 * Composition Root (apps).
 *
 * @param repository - TaskRepositoryInterface implementation
 * @returns Configured GetTasksUseCase instance
 */
export function createGetTasksUseCase(
  repository: TaskRepositoryInterface,
): IGetTasksUseCase {
  return new GetTasksUseCase(repository);
}
