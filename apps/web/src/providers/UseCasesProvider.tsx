'use client';

import { createContext, useContext, useMemo, ReactNode } from 'react';
import { useApolloClient } from '@apollo/client/react';

// ============================================================================
// EXAMPLE FEATURE IMPORTS (Educational Purpose Only)
// ============================================================================
// The Tasks imports below demonstrate the wiring pattern.
// Remove before starting your project: pnpm clean:example
// See: docs/getting-started/clean-slate.en.md
// ============================================================================

// Application Layer - Tasks Feature
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
  type IGetTasksUseCase,
  type ICreateTaskUseCase,
  type IToggleTaskUseCase,
  type IDeleteTaskUseCase,
} from '@repo/application';

// Infrastructure Layer - Tasks Feature
import {
  ApolloTaskRepository,
  type GraphQLClient,
  useApolloTasksQuery,
  useApolloCreateTask,
  useApolloToggleTask,
  useApolloDeleteTask,
} from '@repo/infrastructure';

/**
 * =============================================================================
 * COMPOSITION ROOT - Feature-Based Architecture
 * =============================================================================
 *
 * This is the Composition Root for the web application.
 * Here we wire up features by connecting:
 *   - Infrastructure implementations (repositories, hooks)
 *   - Application use cases
 *   - React context providers
 *
 * ## Adding a New Feature (e.g., Auth)
 *
 * 1. Import from @repo/application:
 *    - AuthQueryProvider, useAuth hooks
 *    - createAuthUseCases factory
 *
 * 2. Import from @repo/infrastructure:
 *    - ApolloAuthRepository
 *    - useApolloAuth hooks
 *
 * 3. Add to UseCasesContextValue interface
 *
 * 4. Wire up in UseCasesProvider:
 *    - Create repository instance
 *    - Create use cases with createAuthUseCases(authRepository)
 *    - Wrap children with AuthQueryProvider
 *
 * =============================================================================
 */

interface UseCasesContextValue {
  // Tasks Feature
  getTasksUseCase: IGetTasksUseCase;
  createTaskUseCase: ICreateTaskUseCase;
  toggleTaskUseCase: IToggleTaskUseCase;
  deleteTaskUseCase: IDeleteTaskUseCase;
  // Future features:
  // authUseCase: IAuthUseCase;
  // subscriptionUseCase: ISubscriptionUseCase;
}

const UseCasesContext = createContext<UseCasesContextValue | null>(null);

interface UseCasesProviderProps {
  children: ReactNode;
}

/**
 * Composition Root Provider
 *
 * Wires up all features by:
 * 1. Creating infrastructure implementations (Apollo repositories)
 * 2. Injecting them into use cases via factories
 * 3. Providing Apollo-based query/mutation implementations for hooks
 *
 * The application layer remains pure and infrastructure-agnostic.
 *
 * @example
 * ```tsx
 * // For use cases (imperative)
 * const { getTasksUseCase, createTaskUseCase } = useUseCases();
 *
 * // For hooks (declarative, recommended for React)
 * const { data, isLoading } = useGetTasks();
 * const { create, isLoading } = useCreateTask();
 * ```
 */
export function UseCasesProvider({ children }: UseCasesProviderProps) {
  const client = useApolloClient();

  const useCases = useMemo(() => {
    // ==========================================================================
    // EXAMPLE: Tasks Feature - Infrastructure Setup
    // ==========================================================================
    // This demonstrates the wiring pattern. Remove with: pnpm clean:example
    // ==========================================================================
    const taskRepository = new ApolloTaskRepository(client as GraphQLClient);
    const taskUseCases = createTaskUseCases(taskRepository);

    // ==========================================================================
    // Future Features Example:
    // ==========================================================================
    // const authRepository = new ApolloAuthRepository(client as GraphQLClient);
    // const authUseCases = createAuthUseCases(authRepository);

    return {
      ...taskUseCases,
      // ...authUseCases,
    };
  }, [client]);

  return (
    <UseCasesContext.Provider value={useCases}>
      {/* Tasks Feature Providers */}
      <TasksQueryProvider value={useApolloTasksQuery}>
        <CreateTaskMutationProvider value={useApolloCreateTask}>
          <ToggleTaskMutationProvider value={useApolloToggleTask}>
            <DeleteTaskMutationProvider value={useApolloDeleteTask}>
              {/* Future Feature Providers */}
              {/* <AuthQueryProvider value={useApolloAuth}> */}
              {children}
              {/* </AuthQueryProvider> */}
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
 * Use for imperative operations. For most React components,
 * prefer declarative hooks (useGetTasks, useCreateTask, etc.)
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
