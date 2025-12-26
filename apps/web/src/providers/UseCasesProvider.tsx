'use client';

import { createContext, useContext, useMemo, ReactNode } from 'react';
import { useApolloClient } from '@apollo/client/react';
import {
  createGetTasksUseCase,
  IGetTasksUseCase,
  TasksQueryProvider,
} from '@repo/application';
import {
  ApolloTaskRepository,
  useApolloTasksQuery,
} from '@repo/infrastructure';

interface UseCasesContextValue {
  getTasksUseCase: IGetTasksUseCase;
}

const UseCasesContext = createContext<UseCasesContextValue | null>(null);

interface UseCasesProviderProps {
  children: ReactNode;
}

/**
 * Composition Root Provider for Use Cases and Query Implementations
 *
 * This is the true Composition Root - it:
 * 1. Creates infrastructure implementations
 * 2. Injects them into use cases
 * 3. Provides the Apollo-based query implementation for hooks
 *
 * The application layer remains pure and infrastructure-agnostic.
 *
 * Usage:
 * ```tsx
 * // For use cases
 * const { getTasksUseCase } = useUseCases();
 *
 * // For hooks (using injected Apollo implementation)
 * const { data, isLoading } = useGetTasks();
 * ```
 */
export function UseCasesProvider({ children }: UseCasesProviderProps) {
  const client = useApolloClient();

  const useCases = useMemo(() => {
    // Create infrastructure implementations
    const taskRepository = new ApolloTaskRepository(client);

    // Wire up use cases with repositories
    return {
      getTasksUseCase: createGetTasksUseCase(taskRepository),
    };
  }, [client]);

  return (
    <UseCasesContext.Provider value={useCases}>
      <TasksQueryProvider value={useApolloTasksQuery}>
        {children}
      </TasksQueryProvider>
    </UseCasesContext.Provider>
  );
}

/**
 * Hook to access use cases from context
 *
 * @throws Error if used outside UseCasesProvider
 */
export function useUseCases(): UseCasesContextValue {
  const context = useContext(UseCasesContext);
  if (!context) {
    throw new Error('useUseCases must be used within UseCasesProvider');
  }
  return context;
}
