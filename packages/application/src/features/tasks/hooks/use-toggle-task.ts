'use client';

import { createContext, useContext } from 'react';
import {
  ToggleTaskMutationInterface,
  ToggleTaskMutationResult,
} from '@repo/domain';

/**
 * Context for injecting the toggle task mutation implementation
 *
 * This context enables the application layer to remain agnostic
 * of the underlying mutation strategy. The concrete implementation
 * (Apollo, React Query, mock, etc.) is injected at the composition root.
 */
const ToggleTaskMutationContext =
  createContext<ToggleTaskMutationInterface | null>(null);

/**
 * Provider component for toggle task mutation implementation
 *
 * Use this at the composition root to inject the concrete implementation:
 *
 * @example
 * ```tsx
 * import { useApolloToggleTask } from '@repo/infrastructure';
 *
 * <ToggleTaskMutationProvider value={useApolloToggleTask}>
 *   <App />
 * </ToggleTaskMutationProvider>
 * ```
 */
export const ToggleTaskMutationProvider = ToggleTaskMutationContext.Provider;

/**
 * Hook to toggle task completion using the injected mutation implementation
 *
 * This hook provides a clean interface for toggling tasks while remaining
 * agnostic of the underlying implementation.
 *
 * @returns ToggleTaskMutationResult with toggle function and state
 * @throws Error if used outside of ToggleTaskMutationProvider
 *
 * @example
 * ```tsx
 * function TaskItem({ task }) {
 *   const { toggle, isLoading } = useToggleTask();
 *
 *   const handleToggle = async () => {
 *     const result = await toggle(task.id);
 *     if (result.ok) {
 *       console.log('Task toggled:', result.value);
 *     }
 *   };
 *
 *   return <Checkbox onClick={handleToggle} disabled={isLoading} />;
 * }
 * ```
 */
export function useToggleTask(): ToggleTaskMutationResult {
  const mutation = useContext(ToggleTaskMutationContext);

  if (!mutation) {
    throw new Error(
      'useToggleTask must be used within ToggleTaskMutationProvider',
    );
  }

  return mutation();
}

