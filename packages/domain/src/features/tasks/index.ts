/**
 * Tasks Feature - Public API
 *
 * This is the single entry point for the Tasks feature.
 * All public types, schemas, and interfaces are exported from here.
 *
 * Usage:
 *   import { Task, TaskRepositoryInterface } from '@repo/domain/features/tasks';
 *   // or via the main package export
 *   import { Task, TaskRepositoryInterface } from '@repo/domain';
 */

// Entities
export {
  TaskSchema,
  type Task,
  CreateTaskInputSchema,
  type CreateTaskInput,
  UpdateTaskInputSchema,
  type UpdateTaskInput,
} from './entities';

// Repository Interface
export type { TaskRepositoryInterface } from './repositories';

// Contracts (for hooks)
export type {
  TasksQueryResult,
  TasksQueryInterface,
  CreateTaskMutationResult,
  CreateTaskMutationInterface,
  ToggleTaskMutationResult,
  ToggleTaskMutationInterface,
  DeleteTaskMutationResult,
  DeleteTaskMutationInterface,
} from './contracts';

