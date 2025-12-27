'use client';

import { createContext, useContext, useMemo, ReactNode } from 'react';
import { useApolloClient } from '@apollo/client/react';
import {
  // Query Providers
  TasksQueryProvider,
  // Mutation Providers
  CreateTaskMutationProvider,
  ToggleTaskMutationProvider,
  DeleteTaskMutationProvider,
  // Use Case Factories
  createTaskUseCases,
  // Use Case Interfaces
  IGetTasksUseCase,
  ICreateTaskUseCase,
  IToggleTaskUseCase,
  IDeleteTaskUseCase,
} from '@repo/application';
import {
  ApolloTaskRepository,
  GraphQLClient,
  useApolloTasksQuery,
  useApolloCreateTask,
  useApolloToggleTask,
  useApolloDeleteTask,
} from '@repo/infrastructure';

interface UseCasesContextValue {
  getTasksUseCase: IGetTasksUseCase;
  createTaskUseCase: ICreateTaskUseCase;
  toggleTaskUseCase: IToggleTaskUseCase;
  deleteTaskUseCase: IDeleteTaskUseCase;
}

const UseCasesContext = createContext<UseCasesContextValue | null>(null);

interface UseCasesProviderProps {
  children: ReactNode;
}

/**
 * Composition Root Provider for Use Cases and Query/Mutation Implementations
 *
 * This is the true Composition Root - it:
 * 1. Creates infrastructure implementations (Apollo Repository)
 * 2. Injects them into use cases
 * 3. Provides Apollo-based query and mutation implementations for hooks
 *
 * The application layer remains pure and infrastructure-agnostic.
 *
 * Usage:
 * ```tsx
 * // For use cases (imperative)
 * const { getTasksUseCase, createTaskUseCase } = useUseCases();
 *
 * // For hooks (declarative, recommended for React)
 * const { data, isLoading } = useGetTasks();
 * const { create, isLoading } = useCreateTask();
 * const { toggle } = useToggleTask();
 * const { remove } = useDeleteTask();
 * ```
 */
export function UseCasesProvider({ children }: UseCasesProviderProps) {
  const client = useApolloClient();

  const useCases = useMemo(() => {
    // Create infrastructure implementations
    // Cast Apollo Client to GraphQLClient interface for repository compatibility
    const taskRepository = new ApolloTaskRepository(client as GraphQLClient);

    // Wire up all use cases with repositories
    return createTaskUseCases(taskRepository);
  }, [client]);

  return (
    <UseCasesContext.Provider value={useCases}>
      <TasksQueryProvider value={useApolloTasksQuery}>
        <CreateTaskMutationProvider value={useApolloCreateTask}>
          <ToggleTaskMutationProvider value={useApolloToggleTask}>
            <DeleteTaskMutationProvider value={useApolloDeleteTask}>
              {children}
            </DeleteTaskMutationProvider>
          </ToggleTaskMutationProvider>
        </CreateTaskMutationProvider>
      </TasksQueryProvider>
    </UseCasesContext.Provider>
  );
}

/**
 * Hook to access use cases from context
 *
 * Use this hook when you need direct access to use cases for imperative operations.
 * For most React components, prefer using the declarative hooks (useGetTasks, etc.)
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
