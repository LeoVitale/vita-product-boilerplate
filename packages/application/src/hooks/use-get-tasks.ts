import { useQuery } from '@apollo/client';
import { GetTasksDocument } from '@repo/graphql';
import { TaskSchema } from '@repo/domain';

/**
 * Hook to fetch tasks using Apollo Client
 * 
 * This hook uses Apollo's useQuery with cache-and-network policy:
 * - Returns cached data immediately (if available)
 * - Fetches fresh data in the background
 * - Automatically handles loading, error, and refetch states
 * 
 * @returns Object with data, loading state, error state, and refetch function
 */
export function useGetTasks() {
  const { data, loading, error, refetch } = useQuery(GetTasksDocument, {
    fetchPolicy: 'cache-and-network',
  });

  // Map and validate with Zod
  const tasks = data?.tasks?.map((t: any) =>
    TaskSchema.parse({
      id: t.id,
      title: t.title,
      completed: t.completed,
    })
  );

  return {
    data: tasks,
    isLoading: loading,
    isError: !!error,
    error,
    refetch,
  };
}
