import { Task, TaskRepositoryInterface, Result } from '@repo/domain';

export interface IGetTasksUseCase {
  execute(): Promise<Result<Task[]>>;
}

export class GetTasksUseCase implements IGetTasksUseCase {
  constructor(private taskRepo: TaskRepositoryInterface) {}

  async execute(): Promise<Result<Task[]>> {
    // Aqui você poderia adicionar lógica de negócio,
    // como filtragem, ordenação ou estatísticas.
    return this.taskRepo.findAll();
  }
}

