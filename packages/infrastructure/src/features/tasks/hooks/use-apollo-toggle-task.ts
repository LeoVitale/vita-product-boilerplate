'use client';

import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { ToggleTaskCompleteDocument, GetTasksDocument } from '@repo/graphql';
import {
  ToggleTaskMutationResult,
  Task,
  Result,
  success,
  failure,
  DomainError,
  NetworkError,
} from '@repo/domain';
import { TaskMapper } from '../mappers/task.mapper';

/**
 * Apollo Client implementation for toggling task completion
 *
 * This hook provides the concrete implementation of the toggle task mutation
 * using Apollo Client's useMutation with cache updates.
 *
 * Features:
 * - Toggles task completion status via GraphQL mutation
 * - Updates the Apollo cache automatically
 * - Returns Result type for consistent error handling
 * - Validates response data with Zod schema
 *
 * @returns ToggleTaskMutationResult with toggle function and state
 */
export function useApolloToggleTask(): ToggleTaskMutationResult {
  const [data, setData] = useState<Task | undefined>(undefined);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [mutate, { loading }] = useMutation(ToggleTaskCompleteDocument, {
    refetchQueries: [{ query: GetTasksDocument }],
  });

  const reset = useCallback(() => {
    setData(undefined);
    setIsError(false);
    setError(null);
  }, []);

  const toggle = useCallback(
    async (id: string): Promise<Result<Task, DomainError>> => {
      try {
        reset();
        const result = await mutate({
          variables: { id },
        });

        if (!result.data?.toggleTaskComplete) {
          const err = new NetworkError('Failed to toggle task');
          setIsError(true);
          setError(err);
          return failure(err);
        }

        const task = TaskMapper.toDomain(result.data.toggleTaskComplete);
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
    toggle,
    isLoading: loading,
    isError,
    error,
    data,
    reset,
  };
}

