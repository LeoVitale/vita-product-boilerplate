import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTaskUseCase } from './create-task.use-case';
import {
  TaskRepositoryInterface,
  CreateTaskInput,
  Task,
  success,
  failure,
  DomainError,
} from '@repo/domain';

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let mockRepository: TaskRepositoryInterface;

  const mockInput: CreateTaskInput = {
    title: 'New Task',
    description: 'Task description',
  };

  const mockTask: Task = {
    id: '1',
    title: mockInput.title,
    description: mockInput.description ?? null,
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

    useCase = new CreateTaskUseCase(mockRepository);
  });

  describe('execute', () => {
    it('given_valid_input_when_execute_then_returns_success_with_created_task', async () => {
      // arrange
      vi.mocked(mockRepository.create).mockResolvedValue(success(mockTask));

      // act
      const result = await useCase.execute(mockInput);

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual(mockTask);
        expect(result.value.title).toBe(mockInput.title);
        expect(result.value.completed).toBe(false);
      }
      expect(mockRepository.create).toHaveBeenCalledWith(mockInput);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });

    it('given_repository_fails_when_execute_then_returns_failure', async () => {
      // arrange
      const error = {
        code: 'VALIDATION_ERROR',
        message: 'Title is required',
      } as DomainError;
      vi.mocked(mockRepository.create).mockResolvedValue(failure(error));

      // act
      const result = await useCase.execute(mockInput);

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('VALIDATION_ERROR');
        expect(result.error.message).toBe('Title is required');
      }
    });

    it('given_minimal_input_when_execute_then_creates_task_successfully', async () => {
      // arrange
      const minimalInput: CreateTaskInput = {
        title: 'Minimal Task',
      };
      const minimalTask: Task = {
        ...mockTask,
        title: minimalInput.title,
        description: null,
      };
      vi.mocked(mockRepository.create).mockResolvedValue(success(minimalTask));

      // act
      const result = await useCase.execute(minimalInput);

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.title).toBe(minimalInput.title);
        expect(result.value.description).toBeNull();
      }
    });

    it('given_input_with_description_when_execute_then_creates_task_with_description', async () => {
      // arrange
      const inputWithDescription: CreateTaskInput = {
        title: 'Task with description',
        description: 'A detailed description',
      };
      const taskWithDescription: Task = {
        ...mockTask,
        title: inputWithDescription.title,
        description: inputWithDescription.description ?? null,
      };
      vi.mocked(mockRepository.create).mockResolvedValue(
        success(taskWithDescription),
      );

      // act
      const result = await useCase.execute(inputWithDescription);

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.description).toBe(inputWithDescription.description);
      }
    });

    it('given_repository_network_error_when_execute_then_returns_failure', async () => {
      // arrange
      const error = {
        code: 'NETWORK_ERROR',
        message: 'Failed to create task',
      } as DomainError;
      vi.mocked(mockRepository.create).mockResolvedValue(failure(error));

      // act
      const result = await useCase.execute(mockInput);

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('NETWORK_ERROR');
      }
    });
  });
});
