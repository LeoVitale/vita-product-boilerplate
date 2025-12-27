import {
  Task,
  TaskRepositoryInterface,
  Result,
  DomainError,
} from '@repo/domain';

export interface IDeleteTaskUseCase {
  execute(id: string): Promise<Result<Task, DomainError>>;
}

/**
 * Use case for deleting a task
 *
 * This use case orchestrates the deletion of a task,
 * delegating to the repository for persistence.
 */
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(private readonly taskRepo: TaskRepositoryInterface) {}

  async execute(id: string): Promise<Result<Task, DomainError>> {
    // Here you could add business logic,
    // like soft delete, audit logging, cascading deletes, etc.
    return this.taskRepo.delete(id);
  }
}
