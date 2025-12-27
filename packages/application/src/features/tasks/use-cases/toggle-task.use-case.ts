import {
  Task,
  TaskRepositoryInterface,
  Result,
  DomainError,
} from '@repo/domain';

export interface IToggleTaskUseCase {
  execute(id: string): Promise<Result<Task, DomainError>>;
}

/**
 * Use case for toggling task completion status
 *
 * This use case orchestrates toggling a task's completed state,
 * delegating to the repository for persistence.
 */
export class ToggleTaskUseCase implements IToggleTaskUseCase {
  constructor(private readonly taskRepo: TaskRepositoryInterface) {}

  async execute(id: string): Promise<Result<Task, DomainError>> {
    // Here you could add business logic,
    // like checking permissions, logging, etc.
    return this.taskRepo.toggleComplete(id);
  }
}
