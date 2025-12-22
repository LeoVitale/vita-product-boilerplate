import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Task } from '../../domain/entities/task';

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
    }
  }
`;

export function useGetTasks(
  options?: useQuery.Options<{ tasks: Task[] }>
) {
  const { data, loading, error, refetch } = useQuery<{ tasks: Task[] }>(GET_TASKS, options);

  return {
    data: data?.tasks,
    isLoading: loading,
    isError: !!error,
    error,
    refetch,
  };
}
