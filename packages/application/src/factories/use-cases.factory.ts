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
 * @param client - Apollo Client instance (accepts any ApolloClient instance)
 * @returns Configured GetTasksUseCase instance
 */
export function createGetTasksUseCase(
  client: ApolloClient | unknown,
): IGetTasksUseCase {
  const repository = new ApolloTaskRepository(client as ApolloClient);
  return new GetTasksUseCase(repository);
}
