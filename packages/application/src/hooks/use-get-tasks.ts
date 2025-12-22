import { useQuery } from '@apollo/client/react';
import {
  GetTasksDocument,
  type GetTasksQuery,
  type GetTasksQueryVariables,
} from '@repo/graphql';
import type { Task } from '@repo/domain';

export function useGetTasks(
  options?: Omit<
    Parameters<typeof useQuery<GetTasksQuery, GetTasksQueryVariables>>[1],
    'query'
  >,
) {
  const { data, loading, error, refetch } = useQuery(GetTasksDocument, options);

  const tasks: Task[] | undefined = data?.tasks?.map((task) => ({
    id: task.id,
    title: task.title,
    completed: task.completed,
  }));

  return {
    data: tasks,
    isLoading: loading,
    isError: !!error,
    error,
    refetch,
  };
}

