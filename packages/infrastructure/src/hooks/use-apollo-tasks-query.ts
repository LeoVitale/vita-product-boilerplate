import { useQuery } from '@apollo/client/react';
import { GetTasksDocument } from '@repo/graphql';
import { TaskSchema, TasksQueryResult } from '@repo/domain';

/**
 * Apollo Client implementation of TasksQueryInterface
 *
 * This hook provides the concrete implementation of the tasks query
 * using Apollo Client's useQuery with cache-and-network policy.
 *
 * Features:
 * - Returns cached data immediately (if available)
 * - Fetches fresh data in the background
 * - Validates data with Zod schema
 * - Implements TasksQueryResult interface for consistency
 *
 * @returns TasksQueryResult with tasks data, loading/error states, and refetch function
 */
export function useApolloTasksQuery(): TasksQueryResult {
  const { data, loading, error, refetch } = useQuery(GetTasksDocument, {
    fetchPolicy: 'cache-and-network',
  });

  // Map and validate with Zod at the infrastructure boundary
  const tasks = data?.tasks?.map((t) =>
    TaskSchema.parse({
      id: t.id,
      title: t.title,
      completed: t.completed,
    }),
  );

  return {
    data: tasks,
    isLoading: loading,
    isError: !!error,
    error: error ?? null,
    refetch: () => {
      void refetch();
    },
  };
}

