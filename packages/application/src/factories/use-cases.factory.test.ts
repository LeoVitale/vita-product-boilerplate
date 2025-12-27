import { describe, it, expect, vi } from 'vitest';
import {
  createGetTasksUseCase,
  createCreateTaskUseCase,
  createToggleTaskUseCase,
  createDeleteTaskUseCase,
  createTaskUseCases,
} from './use-cases.factory';
import { TaskRepositoryInterface, success } from '@repo/domain';

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: null,
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/**
 * Creates a mock repository for testing
 */
function createMockRepository(
  overrides?: Partial<TaskRepositoryInterface>,
): TaskRepositoryInterface {
  return {
    findAll: vi.fn().mockResolvedValue(success([])),
    findById: vi.fn().mockResolvedValue(success(null)),
    create: vi.fn().mockResolvedValue(success(mockTask)),
    toggleComplete: vi.fn().mockResolvedValue(success(mockTask)),
    delete: vi.fn().mockResolvedValue(success(mockTask)),
    ...overrides,
  };
}

describe('UseCases Factory', () => {
  describe('createGetTasksUseCase', () => {
    it('given_repository_when_create_then_returns_instance', () => {
      // arrange
      const repository = createMockRepository();

      // act
      const useCase = createGetTasksUseCase(repository);

      // assert
      expect(useCase).toBeDefined();
      expect(useCase.execute).toBeInstanceOf(Function);
    });

    it('given_repository_when_execute_then_calls_repository', async () => {
      // arrange
      const mockTasks = [mockTask];
      const findAllMock = vi.fn().mockResolvedValue(success(mockTasks));
      const repository = createMockRepository({ findAll: findAllMock });

      // act
      const useCase = createGetTasksUseCase(repository);
      const result = await useCase.execute();

      // assert
      expect(result.ok).toBe(true);
      expect(findAllMock).toHaveBeenCalled();
      if (result.ok) {
        expect(result.value).toEqual(mockTasks);
      }
    });
  });

  describe('createCreateTaskUseCase', () => {
    it('given_repository_when_create_then_returns_instance', () => {
      // arrange
      const repository = createMockRepository();

      // act
      const useCase = createCreateTaskUseCase(repository);

      // assert
      expect(useCase).toBeDefined();
      expect(useCase.execute).toBeInstanceOf(Function);
    });

    it('given_repository_when_execute_then_calls_repository_create', async () => {
      // arrange
      const createMock = vi.fn().mockResolvedValue(success(mockTask));
      const repository = createMockRepository({ create: createMock });

      // act
      const useCase = createCreateTaskUseCase(repository);
      const result = await useCase.execute({ title: 'New Task' });

      // assert
      expect(result.ok).toBe(true);
      expect(createMock).toHaveBeenCalledWith({ title: 'New Task' });
    });
  });

  describe('createToggleTaskUseCase', () => {
    it('given_repository_when_create_then_returns_instance', () => {
      // arrange
      const repository = createMockRepository();

      // act
      const useCase = createToggleTaskUseCase(repository);

      // assert
      expect(useCase).toBeDefined();
      expect(useCase.execute).toBeInstanceOf(Function);
    });

    it('given_repository_when_execute_then_calls_repository_toggle', async () => {
      // arrange
      const toggleMock = vi.fn().mockResolvedValue(success(mockTask));
      const repository = createMockRepository({ toggleComplete: toggleMock });

      // act
      const useCase = createToggleTaskUseCase(repository);
      const result = await useCase.execute('1');

      // assert
      expect(result.ok).toBe(true);
      expect(toggleMock).toHaveBeenCalledWith('1');
    });
  });

  describe('createDeleteTaskUseCase', () => {
    it('given_repository_when_create_then_returns_instance', () => {
      // arrange
      const repository = createMockRepository();

      // act
      const useCase = createDeleteTaskUseCase(repository);

      // assert
      expect(useCase).toBeDefined();
      expect(useCase.execute).toBeInstanceOf(Function);
    });

    it('given_repository_when_execute_then_calls_repository_delete', async () => {
      // arrange
      const deleteMock = vi.fn().mockResolvedValue(success(mockTask));
      const repository = createMockRepository({ delete: deleteMock });

      // act
      const useCase = createDeleteTaskUseCase(repository);
      const result = await useCase.execute('1');

      // assert
      expect(result.ok).toBe(true);
      expect(deleteMock).toHaveBeenCalledWith('1');
    });
  });

  describe('createTaskUseCases', () => {
    it('given_repository_when_create_all_then_returns_all_use_cases', () => {
      // arrange
      const repository = createMockRepository();

      // act
      const useCases = createTaskUseCases(repository);

      // assert
      expect(useCases.getTasksUseCase).toBeDefined();
      expect(useCases.createTaskUseCase).toBeDefined();
      expect(useCases.toggleTaskUseCase).toBeDefined();
      expect(useCases.deleteTaskUseCase).toBeDefined();
    });
  });
});
