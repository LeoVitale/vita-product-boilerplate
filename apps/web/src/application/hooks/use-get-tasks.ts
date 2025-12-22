import { useQuery } from '@apollo/client/react';
import {
  GetTasksDocument,
  type GetTasksQuery,
  type GetTasksQueryVariables,
} from '@repo/graphql';

export function useGetTasks(
  options?: Omit<
    Parameters<typeof useQuery<GetTasksQuery, GetTasksQueryVariables>>[1],
    'query'
  >,
) {
  const { data, loading, error, refetch } = useQuery(GetTasksDocument, options);

  return {
    data: data?.tasks,
    isLoading: loading,
    isError: !!error,
    error,
    refetch,
  };
}
