import { describe, it, expect, vi } from 'vitest';
import { ApolloTaskRepository, GraphQLClient } from './apollo-task-repository';
import {
  GetTasksDocument,
  CreateTaskDocument,
  ToggleTaskCompleteDocument,
  DeleteTaskDocument,
} from '@repo/graphql';

const validTaskData = {
  id: '1',
  title: 'Task One',
  description: 'Description',
  completed: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-02T00:00:00Z',
};

/**
 * Creates a mock GraphQL client for testing
 */
function createMockClient(overrides?: {
  queryResponse?: { data?: unknown };
  mutateResponse?: { data?: unknown };
  shouldThrow?: Error;
}): GraphQLClient {
  return {
    query: vi.fn().mockImplementation(() => {
      if (overrides?.shouldThrow) {
        return Promise.reject(overrides.shouldThrow);
      }
      return Promise.resolve(
        overrides?.queryResponse ?? { data: { tasks: [] } },
      );
    }),
    mutate: vi.fn().mockImplementation(() => {
      if (overrides?.shouldThrow) {
        return Promise.reject(overrides.shouldThrow);
      }
      return Promise.resolve(overrides?.mutateResponse ?? { data: null });
    }),
  };
}

describe('ApolloTaskRepository', () => {
  describe('findAll', () => {
    it('given_successful_query_when_findAll_then_returns_success_with_tasks', async () => {
      // arrange
      const mockTasks = [
        validTaskData,
        { ...validTaskData, id: '2', title: 'Task Two', completed: true },
      ];
      const mockClient = createMockClient({
        queryResponse: { data: { tasks: mockTasks } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findAll();

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(2);
        expect(result.value[0]?.id).toBe('1');
        expect(result.value[1]?.id).toBe('2');
      }
      expect(mockClient.query).toHaveBeenCalledWith({
        query: GetTasksDocument,
      });
    });

    it('given_empty_response_when_findAll_then_returns_success_with_empty_array', async () => {
      // arrange
      const mockClient = createMockClient({
        queryResponse: { data: { tasks: [] } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findAll();

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual([]);
      }
    });

    it('given_null_tasks_when_findAll_then_returns_success_with_empty_array', async () => {
      // arrange
      const mockClient = createMockClient({
        queryResponse: { data: { tasks: undefined } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findAll();

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual([]);
      }
    });

    it('given_query_error_when_findAll_then_returns_failure', async () => {
      // arrange
      const networkError = new Error('Network error');
      const mockClient = createMockClient({ shouldThrow: networkError });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findAll();

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.message).toBe('Network error');
      }
    });
  });

  describe('findById', () => {
    it('given_existing_task_when_findById_then_returns_task', async () => {
      // arrange
      const mockClient = createMockClient({
        queryResponse: { data: { tasks: [validTaskData] } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findById('1');

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value?.id).toBe('1');
      }
    });

    it('given_non_existing_task_when_findById_then_returns_null', async () => {
      // arrange
      const mockClient = createMockClient({
        queryResponse: { data: { tasks: [validTaskData] } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findById('999');

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toBeNull();
      }
    });
  });

  describe('create', () => {
    it('given_valid_input_when_create_then_returns_created_task', async () => {
      // arrange
      const mockClient = createMockClient({
        mutateResponse: { data: { createTask: validTaskData } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.create({
        title: 'New Task',
        description: 'Description',
      });

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.id).toBe('1');
        expect(result.value.title).toBe('Task One');
      }
      expect(mockClient.mutate).toHaveBeenCalledWith({
        mutation: CreateTaskDocument,
        variables: { title: 'New Task', description: 'Description' },
      });
    });

    it('given_null_response_when_create_then_returns_failure', async () => {
      // arrange
      const mockClient = createMockClient({
        mutateResponse: { data: { createTask: null } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.create({ title: 'New Task' });

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.message).toBe('Failed to create task');
      }
    });
  });

  describe('toggleComplete', () => {
    it('given_existing_task_when_toggle_then_returns_updated_task', async () => {
      // arrange
      const toggledTask = { ...validTaskData, completed: true };
      const mockClient = createMockClient({
        mutateResponse: { data: { toggleTaskComplete: toggledTask } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.toggleComplete('1');

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.completed).toBe(true);
      }
      expect(mockClient.mutate).toHaveBeenCalledWith({
        mutation: ToggleTaskCompleteDocument,
        variables: { id: '1' },
      });
    });

    it('given_null_response_when_toggle_then_returns_failure', async () => {
      // arrange
      const mockClient = createMockClient({
        mutateResponse: { data: { toggleTaskComplete: null } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.toggleComplete('1');

      // assert
      expect(result.ok).toBe(false);
    });
  });

  describe('delete', () => {
    it('given_existing_task_when_delete_then_returns_deleted_task', async () => {
      // arrange
      const mockClient = createMockClient({
        mutateResponse: { data: { deleteTask: validTaskData } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.delete('1');

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.id).toBe('1');
      }
      expect(mockClient.mutate).toHaveBeenCalledWith({
        mutation: DeleteTaskDocument,
        variables: { id: '1' },
      });
    });

    it('given_null_response_when_delete_then_returns_failure', async () => {
      // arrange
      const mockClient = createMockClient({
        mutateResponse: { data: { deleteTask: null } },
      });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.delete('1');

      // assert
      expect(result.ok).toBe(false);
    });
  });
});
