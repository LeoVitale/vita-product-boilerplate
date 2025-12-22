import { useQuery, gql, QueryHookOptions } from '@apollo/client';
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
  options?: QueryHookOptions<{ tasks: Task[] }>
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
