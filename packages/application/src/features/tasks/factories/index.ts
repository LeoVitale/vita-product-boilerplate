/**
 * Task Factories - Public API
 */
import {
  createGetTasksUseCase,
  createCreateTaskUseCase,
  createToggleTaskUseCase,
  createDeleteTaskUseCase,
  createTaskUseCases,
} from './use-cases.factory';

export {
  createGetTasksUseCase,
  createCreateTaskUseCase,
  createToggleTaskUseCase,
  createDeleteTaskUseCase,
};

export { createTaskUseCases };

export type TaskUseCases = ReturnType<typeof createTaskUseCases>;
