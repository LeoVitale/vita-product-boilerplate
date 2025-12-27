import {
  Task,
  TaskRepositoryInterface,
  CreateTaskInput,
  Result,
  DomainError,
} from '@repo/domain';

export interface ICreateTaskUseCase {
  execute(input: CreateTaskInput): Promise<Result<Task, DomainError>>;
}

/**
 * Use case for creating a new task
 *
 * This use case orchestrates the creation of a new task,
 * delegating to the repository for persistence.
 */
export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(private readonly taskRepo: TaskRepositoryInterface) {}

  async execute(input: CreateTaskInput): Promise<Result<Task, DomainError>> {
    // Here you could add business logic validation,
    // like checking for duplicate titles, rate limiting, etc.
    return this.taskRepo.create(input);
  }
}
