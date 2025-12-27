import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  GetTasksDocument,
  GetTasksQuery,
  GetTasksQueryVariables,
  CreateTaskDocument,
  CreateTaskMutation,
  CreateTaskMutationVariables,
  ToggleTaskCompleteDocument,
  ToggleTaskCompleteMutation,
  ToggleTaskCompleteMutationVariables,
  DeleteTaskDocument,
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
} from '@repo/graphql';
import {
  Task,
  TaskRepositoryInterface,
  CreateTaskInput,
  Result,
  success,
  failure,
  DomainError,
  NetworkError,
  ValidationError,
} from '@repo/domain';
import { TaskMapper } from '../mappers/task.mapper';

/**
 * GraphQL Client interface
 *
 * This interface abstracts the Apollo Client to allow for easier testing
 * and potential replacement with other GraphQL clients. Uses a minimal
 * interface that is compatible with Apollo Client's API.
 */
export interface GraphQLClient {
  query<TData = unknown, TVariables = Record<string, unknown>>(options: {
    query: TypedDocumentNode<TData, TVariables>;
    variables?: TVariables;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }): Promise<{ data?: TData | null }>;

  mutate<TData = unknown, TVariables = Record<string, unknown>>(options: {
    mutation: TypedDocumentNode<TData, TVariables>;
    variables?: TVariables;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }): Promise<{ data?: TData | null }>;
}

/**
 * Apollo Client implementation of TaskRepositoryInterface
 *
 * This repository implements all CRUD operations for tasks using
 * GraphQL mutations and queries. It uses the TaskMapper for data
 * transformation and domain errors for proper error handling.
 */
export class ApolloTaskRepository implements TaskRepositoryInterface {
  constructor(private readonly client: GraphQLClient) {}

  async findAll(): Promise<Result<Task[], DomainError>> {
    try {
      const { data } = await this.client.query<
        GetTasksQuery,
        GetTasksQueryVariables
      >({
        query: GetTasksDocument,
      });

      if (!data?.tasks) {
        return success([]);
      }

      const tasks = TaskMapper.toDomainList(data.tasks);
      return success(tasks);
    } catch (error) {
      return failure(this.handleError(error));
    }
  }

  async findById(id: string): Promise<Result<Task | null, DomainError>> {
    try {
      const { data } = await this.client.query<
        GetTasksQuery,
        GetTasksQueryVariables
      >({
        query: GetTasksDocument,
      });

      if (!data?.tasks) {
        return success(null);
      }

      const task = data.tasks.find((t) => t.id === id);
      if (!task) {
        return success(null);
      }

      return success(TaskMapper.toDomain(task));
    } catch (error) {
      return failure(this.handleError(error));
    }
  }

  async create(input: CreateTaskInput): Promise<Result<Task, DomainError>> {
    try {
      const { data } = await this.client.mutate<
        CreateTaskMutation,
        CreateTaskMutationVariables
      >({
        mutation: CreateTaskDocument,
        variables: {
          title: input.title,
          description: input.description ?? null,
        },
      });

      if (!data?.createTask) {
        return failure(new NetworkError('Failed to create task'));
      }

      const task = TaskMapper.toDomain(data.createTask);
      return success(task);
    } catch (error) {
      return failure(this.handleError(error));
    }
  }

  async toggleComplete(id: string): Promise<Result<Task, DomainError>> {
    try {
      const { data } = await this.client.mutate<
        ToggleTaskCompleteMutation,
        ToggleTaskCompleteMutationVariables
      >({
        mutation: ToggleTaskCompleteDocument,
        variables: { id },
      });

      if (!data?.toggleTaskComplete) {
        return failure(new NetworkError('Failed to toggle task completion'));
      }

      const task = TaskMapper.toDomain(data.toggleTaskComplete);
      return success(task);
    } catch (error) {
      return failure(this.handleError(error));
    }
  }

  async delete(id: string): Promise<Result<Task, DomainError>> {
    try {
      const { data } = await this.client.mutate<
        DeleteTaskMutation,
        DeleteTaskMutationVariables
      >({
        mutation: DeleteTaskDocument,
        variables: { id },
      });

      if (!data?.deleteTask) {
        return failure(new NetworkError('Failed to delete task'));
      }

      const task = TaskMapper.toDomain(data.deleteTask);
      return success(task);
    } catch (error) {
      return failure(this.handleError(error));
    }
  }

  /**
   * Converts caught errors to domain errors
   */
  private handleError(error: unknown): DomainError {
    if (error instanceof Error) {
      // Check for Zod validation errors
      if (error.name === 'ZodError') {
        return new ValidationError('Invalid task data received from server');
      }
      return new NetworkError(error.message, error);
    }
    return new NetworkError('Unknown error occurred');
  }
}
