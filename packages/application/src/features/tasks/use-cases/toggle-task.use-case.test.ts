import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToggleTaskUseCase } from './toggle-task.use-case';
import {
  TaskRepositoryInterface,
  Task,
  success,
  failure,
  DomainError,
} from '@repo/domain';

describe('ToggleTaskUseCase', () => {
  let useCase: ToggleTaskUseCase;
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

    useCase = new ToggleTaskUseCase(mockRepository);
  });

  describe('execute', () => {
    it('given_valid_task_id_when_execute_then_returns_success_with_toggled_task', async () => {
      // arrange
      const toggledTask = { ...mockTask, completed: true };
      vi.mocked(mockRepository.toggleComplete).mockResolvedValue(
        success(toggledTask),
      );

      // act
      const result = await useCase.execute('1');

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual(toggledTask);
        expect(result.value.completed).toBe(true);
      }
      expect(mockRepository.toggleComplete).toHaveBeenCalledWith('1');
      expect(mockRepository.toggleComplete).toHaveBeenCalledTimes(1);
    });

    it('given_task_not_found_when_execute_then_returns_failure', async () => {
      // arrange
      const error = {
        code: 'NOT_FOUND',
        message: 'Task with id 999 not found',
      } as DomainError;
      vi.mocked(mockRepository.toggleComplete).mockResolvedValue(
        failure(error),
      );

      // act
      const result = await useCase.execute('999');

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('NOT_FOUND');
        expect(result.error.message).toContain('not found');
      }
    });

    it('given_already_completed_task_when_execute_then_toggles_to_incomplete', async () => {
      // arrange
      const toggledTask = { ...mockTask, completed: false };
      vi.mocked(mockRepository.toggleComplete).mockResolvedValue(
        success(toggledTask),
      );

      // act
      const result = await useCase.execute('1');

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.completed).toBe(false);
      }
    });

    it('given_incomplete_task_when_execute_then_toggles_to_completed', async () => {
      // arrange
      const toggledTask = { ...mockTask, completed: true };
      vi.mocked(mockRepository.toggleComplete).mockResolvedValue(
        success(toggledTask),
      );

      // act
      const result = await useCase.execute('1');

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.completed).toBe(true);
      }
    });

    it('given_repository_network_error_when_execute_then_returns_failure', async () => {
      // arrange
      const error = {
        code: 'NETWORK_ERROR',
        message: 'Failed to toggle task',
      } as DomainError;
      vi.mocked(mockRepository.toggleComplete).mockResolvedValue(
        failure(error),
      );

      // act
      const result = await useCase.execute('1');

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('NETWORK_ERROR');
      }
    });
  });
});

