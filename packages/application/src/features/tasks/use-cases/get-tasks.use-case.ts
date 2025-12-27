import {
  Task,
  TaskRepositoryInterface,
  Result,
  DomainError,
} from '@repo/domain';

export interface IGetTasksUseCase {
  execute(): Promise<Result<Task[], DomainError>>;
}

/**
 * Use case for retrieving all tasks
 *
 * This use case orchestrates fetching all tasks,
 * delegating to the repository for data access.
 */
export class GetTasksUseCase implements IGetTasksUseCase {
  constructor(private readonly taskRepo: TaskRepositoryInterface) {}

  async execute(): Promise<Result<Task[], DomainError>> {
    // Here you could add business logic,
    // like filtering, sorting, or statistics.
    return this.taskRepo.findAll();
  }
}
