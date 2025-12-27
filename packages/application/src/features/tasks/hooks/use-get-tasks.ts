'use client';

import { createContext, useContext } from 'react';
import { TasksQueryInterface, TasksQueryResult } from '@repo/domain';

/**
 * Context for injecting the tasks query implementation
 *
 * This context enables the application layer to remain agnostic
 * of the underlying data fetching strategy. The concrete implementation
 * (Apollo, React Query, mock, etc.) is injected at the composition root.
 */
const TasksQueryContext = createContext<TasksQueryInterface | null>(null);

/**
 * Provider component for tasks query implementation
 *
 * Use this at the composition root to inject the concrete implementation:
 *
 * @example
 * ```tsx
 * import { useApolloTasksQuery } from '@repo/infrastructure';
 *
 * <TasksQueryProvider value={useApolloTasksQuery}>
 *   <App />
 * </TasksQueryProvider>
 * ```
 */
export const TasksQueryProvider = TasksQueryContext.Provider;

/**
 * Hook to fetch tasks using the injected query implementation
 *
 * This hook provides a clean interface for fetching tasks while remaining
 * agnostic of the underlying implementation. The actual data fetching
 * strategy is determined by the TasksQueryProvider at the composition root.
 *
 * @returns TasksQueryResult with data, loading/error states, and refetch function
 * @throws Error if used outside of TasksQueryProvider
 *
 * @example
 * ```tsx
 * function TaskList() {
 *   const { data: tasks, isLoading, isError } = useGetTasks();
 *
 *   if (isLoading) return <Loading />;
 *   if (isError) return <Error />;
 *
 *   return <ul>{tasks?.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
 * }
 * ```
 */
export function useGetTasks(): TasksQueryResult {
  const query = useContext(TasksQueryContext);

  if (!query) {
    throw new Error('useGetTasks must be used within TasksQueryProvider');
  }

  return query();
}
