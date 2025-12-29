import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DeleteTaskUseCase } from './delete-task.use-case';
import {
  TaskRepositoryInterface,
  Task,
  success,
  failure,
  DomainError,
} from '@repo/domain';

describe('DeleteTaskUseCase', () => {
  let useCase: DeleteTaskUseCase;
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

    useCase = new DeleteTaskUseCase(mockRepository);
  });

  describe('execute', () => {
    it('given_valid_task_id_when_execute_then_returns_success_with_deleted_task', async () => {
      // arrange
      vi.mocked(mockRepository.delete).mockResolvedValue(success(mockTask));

      // act
      const result = await useCase.execute('1');

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual(mockTask);
        expect(result.value.id).toBe('1');
      }
      expect(mockRepository.delete).toHaveBeenCalledWith('1');
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('given_task_not_found_when_execute_then_returns_failure', async () => {
      // arrange
      const error = {
        code: 'NOT_FOUND',
        message: 'Task with id 999 not found',
      } as DomainError;
      vi.mocked(mockRepository.delete).mockResolvedValue(failure(error));

      // act
      const result = await useCase.execute('999');

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('NOT_FOUND');
        expect(result.error.message).toContain('not found');
      }
    });

    it('given_repository_network_error_when_execute_then_returns_failure', async () => {
      // arrange
      const error = {
        code: 'NETWORK_ERROR',
        message: 'Failed to delete task',
      } as DomainError;
      vi.mocked(mockRepository.delete).mockResolvedValue(failure(error));

      // act
      const result = await useCase.execute('1');

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('NETWORK_ERROR');
      }
    });

    it('given_completed_task_when_execute_then_deletes_successfully', async () => {
      // arrange
      const completedTask = { ...mockTask, completed: true };
      vi.mocked(mockRepository.delete).mockResolvedValue(
        success(completedTask),
      );

      // act
      const result = await useCase.execute('1');

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.completed).toBe(true);
      }
    });

    it('given_any_task_id_when_execute_then_calls_repository_with_correct_id', async () => {
      // arrange
      const taskId = 'unique-task-id-123';
      const taskWithId = { ...mockTask, id: taskId };
      vi.mocked(mockRepository.delete).mockResolvedValue(success(taskWithId));

      // act
      await useCase.execute(taskId);

      // assert
      expect(mockRepository.delete).toHaveBeenCalledWith(taskId);
    });
  });
});

