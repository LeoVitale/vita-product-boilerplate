/**
 * Task Contracts - Public API
 *
 * This barrel export defines what is publicly accessible from the contracts module.
 */
export type {
  TasksQueryResult,
  TasksQueryInterface,
} from './tasks-query.interface';

export type {
  CreateTaskMutationResult,
  CreateTaskMutationInterface,
  ToggleTaskMutationResult,
  ToggleTaskMutationInterface,
  DeleteTaskMutationResult,
  DeleteTaskMutationInterface,
} from './task-mutations.interface';

