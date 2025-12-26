import { describe, it, expect, vi } from 'vitest';
import { ApolloTaskRepository, GraphQLClient } from './apollo-task-repository';
import { GetTasksDocument } from '@repo/graphql';

/**
 * Creates a mock GraphQL client for testing
 */
function createMockClient(
  mockResponse?: { data?: { tasks?: unknown[] } },
  shouldThrow?: Error,
): GraphQLClient {
  return {
    query: vi.fn().mockImplementation(() => {
      if (shouldThrow) {
        return Promise.reject(shouldThrow);
      }
      return Promise.resolve(mockResponse ?? { data: { tasks: [] } });
    }),
  };
}

describe('ApolloTaskRepository', () => {
  describe('findAll', () => {
    it('given_successful_query_when_findAll_then_returns_success_with_tasks', async () => {
      // arrange
      const mockTasks = [
        { id: '1', title: 'Task One', completed: false },
        { id: '2', title: 'Task Two', completed: true },
      ];
      const mockClient = createMockClient({ data: { tasks: mockTasks } });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findAll();

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(2);
        expect(result.value[0]).toEqual({
          id: '1',
          title: 'Task One',
          completed: false,
        });
        expect(result.value[1]).toEqual({
          id: '2',
          title: 'Task Two',
          completed: true,
        });
      }
      expect(mockClient.query).toHaveBeenCalledWith({
        query: GetTasksDocument,
      });
    });

    it('given_empty_response_when_findAll_then_returns_success_with_empty_array', async () => {
      // arrange
      const mockClient = createMockClient({ data: { tasks: [] } });
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
      const mockClient = createMockClient({ data: { tasks: undefined } });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findAll();

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual([]);
      }
    });

    it('given_null_data_when_findAll_then_returns_success_with_empty_array', async () => {
      // arrange
      const mockClient = createMockClient({ data: undefined });
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
      const mockClient = createMockClient(undefined, networkError);
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findAll();

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.message).toBe('Network error');
      }
    });

    it('given_non_error_thrown_when_findAll_then_returns_failure_with_unknown_error', async () => {
      // arrange
      const mockClient: GraphQLClient = {
        query: vi.fn().mockRejectedValue('string error'),
      };
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findAll();

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.message).toBe('Unknown error');
      }
    });

    it('given_invalid_task_data_when_findAll_then_returns_failure', async () => {
      // arrange - task with title less than 3 chars (Zod validation fails)
      const invalidTasks = [{ id: '1', title: 'ab', completed: false }];
      const mockClient = createMockClient({ data: { tasks: invalidTasks } });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findAll();

      // assert - Zod parse throws, which is caught and returns failure
      expect(result.ok).toBe(false);
    });

    it('given_task_missing_required_field_when_findAll_then_returns_failure', async () => {
      // arrange - task missing id field
      const invalidTasks = [{ title: 'Valid Title', completed: false }];
      const mockClient = createMockClient({ data: { tasks: invalidTasks } });
      const repository = new ApolloTaskRepository(mockClient);

      // act
      const result = await repository.findAll();

      // assert
      expect(result.ok).toBe(false);
    });
  });
});

