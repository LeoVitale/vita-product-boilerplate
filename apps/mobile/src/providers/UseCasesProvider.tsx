import { createContext, useContext, useMemo, ReactNode } from 'react';
import { useApolloClient } from '@apollo/client/react';

// ============================================================================
// EXAMPLE FEATURE IMPORTS (Educational Purpose Only)
// ============================================================================
// The Tasks imports below demonstrate the wiring pattern.
// Remove before starting your project: pnpm clean:example
// See: docs/getting-started/clean-slate.en.md
// ============================================================================
import { createGetTasksUseCase, IGetTasksUseCase } from '@repo/application';
import { ApolloTaskRepository } from '@repo/infrastructure';

interface UseCasesContextValue {
  getTasksUseCase: IGetTasksUseCase;
}

const UseCasesContext = createContext<UseCasesContextValue | null>(null);

interface UseCasesProviderProps {
  children: ReactNode;
}

/**
 * Composition Root Provider for Use Cases
 *
 * This is the true Composition Root - it creates infrastructure implementations
 * and injects them into use cases. The application layer remains pure and
 * infrastructure-agnostic.
 */
export function UseCasesProvider({ children }: UseCasesProviderProps) {
  const client = useApolloClient();

  const useCases = useMemo(() => {
    // ==========================================================================
    // EXAMPLE: Tasks Feature - Infrastructure Setup
    // ==========================================================================
    // This demonstrates the wiring pattern. Remove with: pnpm clean:example
    // ==========================================================================
    const taskRepository = new ApolloTaskRepository(client);

    // Wire up use cases with repositories
    return {
      getTasksUseCase: createGetTasksUseCase(taskRepository),
    };
  }, [client]);

  return (
    <UseCasesContext.Provider value={useCases}>
      {children}
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
