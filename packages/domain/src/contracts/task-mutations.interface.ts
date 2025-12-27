import { Task, CreateTaskInput } from '../entities/task';
import { Result } from '../core/result';
import { DomainError } from '../errors/domain-errors';

/**
 * Result type for create task mutation
 */
export interface CreateTaskMutationResult {
  create: (input: CreateTaskInput) => Promise<Result<Task, DomainError>>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: Task | undefined;
  reset: () => void;
}

/**
 * Result type for toggle task mutation
 */
export interface ToggleTaskMutationResult {
  toggle: (id: string) => Promise<Result<Task, DomainError>>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: Task | undefined;
  reset: () => void;
}

/**
 * Result type for delete task mutation
 */
export interface DeleteTaskMutationResult {
  remove: (id: string) => Promise<Result<Task, DomainError>>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: Task | undefined;
  reset: () => void;
}

/**
 * Function type for create task mutation hook
 */
export type CreateTaskMutationInterface = () => CreateTaskMutationResult;

/**
 * Function type for toggle task mutation hook
 */
export type ToggleTaskMutationInterface = () => ToggleTaskMutationResult;

/**
 * Function type for delete task mutation hook
 */
export type DeleteTaskMutationInterface = () => DeleteTaskMutationResult;
