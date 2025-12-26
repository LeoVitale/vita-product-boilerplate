import { describe, it, expect, vi } from 'vitest';
import { createGetTasksUseCase } from './use-cases.factory';
import { TaskRepositoryInterface, success } from '@repo/domain';

/**
 * Creates a mock repository for testing
 */
function createMockRepository(
  overrides?: Partial<TaskRepositoryInterface>,
): TaskRepositoryInterface {
  return {
    findAll: vi.fn().mockResolvedValue(success([])),
    ...overrides,
  };
}

describe('UseCases Factory', () => {
  it('given_repository_when_create_get_tasks_use_case_then_returns_instance', () => {
    // arrange
    const repository = createMockRepository();

    // act
    const useCase = createGetTasksUseCase(repository);

    // assert
    expect(useCase).toBeDefined();
    expect(useCase.execute).toBeInstanceOf(Function);
  });

  it('given_repository_when_execute_use_case_then_calls_repository', async () => {
    // arrange
    const mockTasks = [{ id: '1', title: 'Test Task', completed: false }];
    const findAllMock = vi.fn().mockResolvedValue(success(mockTasks));
    const repository = createMockRepository({ findAll: findAllMock });

    // act
    const useCase = createGetTasksUseCase(repository);
    const result = await useCase.execute();

    // assert - verify repository was called and use case works
    expect(result.ok).toBe(true);
    expect(findAllMock).toHaveBeenCalled();
    if (result.ok) {
      expect(result.value).toEqual(mockTasks);
    }
  });
});
