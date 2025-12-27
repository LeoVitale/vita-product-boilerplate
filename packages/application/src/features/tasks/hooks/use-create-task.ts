'use client';

import { createContext, useContext } from 'react';
import {
  CreateTaskMutationInterface,
  CreateTaskMutationResult,
} from '@repo/domain';

/**
 * Context for injecting the create task mutation implementation
 *
 * This context enables the application layer to remain agnostic
 * of the underlying mutation strategy. The concrete implementation
 * (Apollo, React Query, mock, etc.) is injected at the composition root.
 */
const CreateTaskMutationContext =
  createContext<CreateTaskMutationInterface | null>(null);

/**
 * Provider component for create task mutation implementation
 *
 * Use this at the composition root to inject the concrete implementation:
 *
 * @example
 * ```tsx
 * import { useApolloCreateTask } from '@repo/infrastructure';
 *
 * <CreateTaskMutationProvider value={useApolloCreateTask}>
 *   <App />
 * </CreateTaskMutationProvider>
 * ```
 */
export const CreateTaskMutationProvider = CreateTaskMutationContext.Provider;

/**
 * Hook to create tasks using the injected mutation implementation
 *
 * This hook provides a clean interface for creating tasks while remaining
 * agnostic of the underlying implementation.
 *
 * @returns CreateTaskMutationResult with create function and state
 * @throws Error if used outside of CreateTaskMutationProvider
 *
 * @example
 * ```tsx
 * function CreateTaskForm() {
 *   const { create, isLoading } = useCreateTask();
 *
 *   const handleSubmit = async (title: string) => {
 *     const result = await create({ title });
 *     if (result.ok) {
 *       console.log('Task created:', result.value);
 *     }
 *   };
 *
 *   return <form>...</form>;
 * }
 * ```
 */
export function useCreateTask(): CreateTaskMutationResult {
  const mutation = useContext(CreateTaskMutationContext);

  if (!mutation) {
    throw new Error(
      'useCreateTask must be used within CreateTaskMutationProvider',
    );
  }

  return mutation();
}

