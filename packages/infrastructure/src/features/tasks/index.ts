/**
 * Tasks Feature - Infrastructure Public API
 *
 * This is the single entry point for the Tasks feature in the infrastructure layer.
 * All public repositories, mappers, and hooks are exported from here.
 *
 * Usage:
 *   import { ApolloTaskRepository, TaskMapper } from '@repo/infrastructure/features/tasks';
 *   // or via the main package export
 *   import { ApolloTaskRepository, TaskMapper } from '@repo/infrastructure';
 */

// Repositories
export { ApolloTaskRepository, type GraphQLClient } from './repositories';

// Mappers
export { TaskMapper } from './mappers';

// Hooks
export {
  useApolloTasksQuery,
  useApolloCreateTask,
  useApolloToggleTask,
  useApolloDeleteTask,
} from './hooks';

