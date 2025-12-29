import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetTasksUseCase } from './get-tasks.use-case';
import {
  TaskRepositoryInterface,
  Task,
  success,
  failure,
  DomainError,
} from '@repo/domain';

describe('GetTasksUseCase', () => {
  let useCase: GetTasksUseCase;
  let mockRepository: TaskRepositoryInterface;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test description',
    completed: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      toggleComplete: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new GetTasksUseCase(mockRepository);
  });

  describe('execute', () => {
    it('given_repository_returns_tasks_when_execute_then_returns_success_with_tasks', async () => {
      // arrange
      const tasks = [mockTask];
      vi.mocked(mockRepository.findAll).mockResolvedValue(success(tasks));

      // act
      const result = await useCase.execute();

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual(tasks);
        expect(result.value).toHaveLength(1);
      }
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('given_repository_returns_empty_array_when_execute_then_returns_success_with_empty_array', async () => {
      // arrange
      vi.mocked(mockRepository.findAll).mockResolvedValue(success([]));

      // act
      const result = await useCase.execute();

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual([]);
        expect(result.value).toHaveLength(0);
      }
    });

    it('given_repository_returns_multiple_tasks_when_execute_then_returns_all_tasks', async () => {
      // arrange
      const tasks = [
        mockTask,
        { ...mockTask, id: '2', title: 'Second Task' },
        { ...mockTask, id: '3', title: 'Third Task' },
      ];
      vi.mocked(mockRepository.findAll).mockResolvedValue(success(tasks));

      // act
      const result = await useCase.execute();

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(3);
        expect(result.value[0]?.id).toBe('1');
        expect(result.value[1]?.id).toBe('2');
        expect(result.value[2]?.id).toBe('3');
      }
    });

    it('given_repository_fails_when_execute_then_returns_failure', async () => {
      // arrange
      const error = {
        code: 'FETCH_FAILED',
        message: 'Network error',
      } as DomainError;
      vi.mocked(mockRepository.findAll).mockResolvedValue(failure(error));

      // act
      const result = await useCase.execute();

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('FETCH_FAILED');
        expect(result.error.message).toBe('Network error');
      }
    });

    it('given_repository_fails_with_network_error_when_execute_then_propagates_error', async () => {
      // arrange
      const error = {
        code: 'NETWORK_ERROR',
        message: 'Connection refused',
      } as DomainError;
      vi.mocked(mockRepository.findAll).mockResolvedValue(failure(error));

      // act
      const result = await useCase.execute();

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('NETWORK_ERROR');
      }
    });
  });
});
