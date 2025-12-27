/**
 * Tasks Feature - Public API
 *
 * This is the single entry point for the Tasks feature in the application layer.
 * All public use cases, hooks, and factories are exported from here.
 *
 * Usage:
 *   import { useGetTasks, GetTasksUseCase } from '@repo/application/features/tasks';
 *   // or via the main package export
 *   import { useGetTasks, GetTasksUseCase } from '@repo/application';
 */

// Use Cases
export {
  GetTasksUseCase,
  type IGetTasksUseCase,
  CreateTaskUseCase,
  type ICreateTaskUseCase,
  ToggleTaskUseCase,
  type IToggleTaskUseCase,
  DeleteTaskUseCase,
  type IDeleteTaskUseCase,
} from './use-cases';

// Hooks
export {
  useGetTasks,
  TasksQueryProvider,
  useCreateTask,
  CreateTaskMutationProvider,
  useToggleTask,
  ToggleTaskMutationProvider,
  useDeleteTask,
  DeleteTaskMutationProvider,
} from './hooks';

// Factories
export {
  createTaskUseCases,
  createGetTasksUseCase,
  createCreateTaskUseCase,
  createToggleTaskUseCase,
  createDeleteTaskUseCase,
  type TaskUseCases,
} from './factories';
