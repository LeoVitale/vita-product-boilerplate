'use client';

import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { CreateTaskDocument, GetTasksDocument } from '@repo/graphql';
import {
  CreateTaskInput,
  CreateTaskMutationResult,
  Task,
  Result,
  success,
  failure,
  DomainError,
  NetworkError,
} from '@repo/domain';
import { TaskMapper } from '../mappers/task.mapper';

/**
 * Apollo Client implementation for creating tasks
 *
 * This hook provides the concrete implementation of the create task mutation
 * using Apollo Client's useMutation with cache updates.
 *
 * Features:
 * - Creates a new task via GraphQL mutation
 * - Updates the Apollo cache automatically
 * - Returns Result type for consistent error handling
 * - Validates response data with Zod schema
 *
 * @returns CreateTaskMutationResult with create function and state
 */
export function useApolloCreateTask(): CreateTaskMutationResult {
  const [data, setData] = useState<Task | undefined>(undefined);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [mutate, { loading }] = useMutation(CreateTaskDocument, {
    refetchQueries: [{ query: GetTasksDocument }],
  });

  const reset = useCallback(() => {
    setData(undefined);
    setIsError(false);
    setError(null);
  }, []);

  const create = useCallback(
    async (input: CreateTaskInput): Promise<Result<Task, DomainError>> => {
      try {
        reset();
        const result = await mutate({
          variables: {
            title: input.title,
            description: input.description ?? null,
          },
        });

        if (!result.data?.createTask) {
          const err = new NetworkError('Failed to create task');
          setIsError(true);
          setError(err);
          return failure(err);
        }

        const task = TaskMapper.toDomain(result.data.createTask);
        setData(task);
        return success(task);
      } catch (err) {
        const domainError =
          err instanceof Error
            ? new NetworkError(err.message, err)
            : new NetworkError('Unknown error');
        setIsError(true);
        setError(domainError);
        return failure(domainError);
      }
    },
    [mutate, reset],
  );

  return {
    create,
    isLoading: loading,
    isError,
    error,
    data,
    reset,
  };
}

