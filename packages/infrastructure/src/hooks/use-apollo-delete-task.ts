'use client';

import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { DeleteTaskDocument, GetTasksDocument } from '@repo/graphql';
import {
  DeleteTaskMutationResult,
  Task,
  Result,
  success,
  failure,
  DomainError,
  NetworkError,
} from '@repo/domain';
import { TaskMapper } from '../mappers/task.mapper';

/**
 * Apollo Client implementation for deleting tasks
 *
 * This hook provides the concrete implementation of the delete task mutation
 * using Apollo Client's useMutation with cache updates.
 *
 * Features:
 * - Deletes a task via GraphQL mutation
 * - Updates the Apollo cache automatically
 * - Returns Result type for consistent error handling
 * - Returns the deleted task data
 *
 * @returns DeleteTaskMutationResult with remove function and state
 */
export function useApolloDeleteTask(): DeleteTaskMutationResult {
  const [data, setData] = useState<Task | undefined>(undefined);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [mutate, { loading }] = useMutation(DeleteTaskDocument, {
    refetchQueries: [{ query: GetTasksDocument }],
  });

  const reset = useCallback(() => {
    setData(undefined);
    setIsError(false);
    setError(null);
  }, []);

  const remove = useCallback(
    async (id: string): Promise<Result<Task, DomainError>> => {
      try {
        reset();
        const result = await mutate({
          variables: { id },
        });

        if (!result.data?.deleteTask) {
          const err = new NetworkError('Failed to delete task');
          setIsError(true);
          setError(err);
          return failure(err);
        }

        const task = TaskMapper.toDomain(result.data.deleteTask);
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
    remove,
    isLoading: loading,
    isError,
    error,
    data,
    reset,
  };
}

