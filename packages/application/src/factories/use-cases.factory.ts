import { ApolloClient } from '@apollo/client';
import { ApolloTaskRepository } from '@repo/infrastructure';
import {
  GetTasksUseCase,
  IGetTasksUseCase,
} from '../use-cases/get-tasks.use-case';

/**
 * Factory function to create GetTasksUseCase with injected dependencies
 *
 * This is the composition root for the GetTasks feature.
 * It wires up the repository implementation with the use case.
 *
 * @param client - Apollo Client instance
 * @returns Configured GetTasksUseCase instance
 */
export function createGetTasksUseCase(
  client: ApolloClient<any>,
): IGetTasksUseCase {
  const repository = new ApolloTaskRepository(client);
  return new GetTasksUseCase(repository);
}
