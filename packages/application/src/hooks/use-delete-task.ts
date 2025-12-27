'use client';

import { createContext, useContext } from 'react';
import {
  DeleteTaskMutationInterface,
  DeleteTaskMutationResult,
} from '@repo/domain';

/**
 * Context for injecting the delete task mutation implementation
 *
 * This context enables the application layer to remain agnostic
 * of the underlying mutation strategy. The concrete implementation
 * (Apollo, React Query, mock, etc.) is injected at the composition root.
 */
const DeleteTaskMutationContext =
  createContext<DeleteTaskMutationInterface | null>(null);

/**
 * Provider component for delete task mutation implementation
 *
 * Use this at the composition root to inject the concrete implementation:
 *
 * @example
 * ```tsx
 * import { useApolloDeleteTask } from '@repo/infrastructure';
 *
 * <DeleteTaskMutationProvider value={useApolloDeleteTask}>
 *   <App />
 * </DeleteTaskMutationProvider>
 * ```
 */
export const DeleteTaskMutationProvider = DeleteTaskMutationContext.Provider;

/**
 * Hook to delete tasks using the injected mutation implementation
 *
 * This hook provides a clean interface for deleting tasks while remaining
 * agnostic of the underlying implementation.
 *
 * @returns DeleteTaskMutationResult with remove function and state
 * @throws Error if used outside of DeleteTaskMutationProvider
 *
 * @example
 * ```tsx
 * function TaskItem({ task }) {
 *   const { remove, isLoading } = useDeleteTask();
 *
 *   const handleDelete = async () => {
 *     const result = await remove(task.id);
 *     if (result.ok) {
 *       console.log('Task deleted:', result.value);
 *     }
 *   };
 *
 *   return <Button onClick={handleDelete} disabled={isLoading}>Delete</Button>;
 * }
 * ```
 */
export function useDeleteTask(): DeleteTaskMutationResult {
  const mutation = useContext(DeleteTaskMutationContext);

  if (!mutation) {
    throw new Error(
      'useDeleteTask must be used within DeleteTaskMutationProvider',
    );
  }

  return mutation();
}

