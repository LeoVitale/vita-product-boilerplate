import { Result } from '../core/result';
import { Task, CreateTaskInput } from '../entities/task';
import { DomainError } from '../errors/domain-errors';

/**
 * Task Repository Interface
 *
 * Defines the contract for task data operations. Implementations
 * can use any data source (GraphQL, REST, local storage, etc.)
 * while the application layer remains agnostic.
 */
export interface TaskRepositoryInterface {
  /**
   * Retrieves all tasks
   */
  findAll(): Promise<Result<Task[], DomainError>>;

  /**
   * Retrieves a task by ID
   */
  findById(id: string): Promise<Result<Task | null, DomainError>>;

  /**
   * Creates a new task
   */
  create(input: CreateTaskInput): Promise<Result<Task, DomainError>>;

  /**
   * Toggles the completion status of a task
   */
  toggleComplete(id: string): Promise<Result<Task, DomainError>>;

  /**
   * Deletes a task by ID
   */
  delete(id: string): Promise<Result<Task, DomainError>>;
}
