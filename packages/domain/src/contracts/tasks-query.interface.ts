import { Task } from '../entities/task';

/**
 * Result type for tasks query operations
 *
 * Provides a standardized interface for query results that can be
 * implemented by any data fetching strategy (Apollo, REST, mock, etc.)
 */
export interface TasksQueryResult {
  data: Task[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Abstract interface for tasks query hook
 *
 * This interface allows the application layer to remain agnostic
 * of the underlying data fetching implementation (Apollo, React Query, etc.)
 */
export interface TasksQueryInterface {
  (): TasksQueryResult;
}

