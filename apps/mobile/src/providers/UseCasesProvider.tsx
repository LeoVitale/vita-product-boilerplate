import { createContext, useContext, useMemo, ReactNode } from 'react';
import { useApolloClient } from '@apollo/client/react';
import { createGetTasksUseCase, IGetTasksUseCase } from '@repo/application';

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
 * This provider centralizes dependency injection for all use cases.
 * It creates use case instances with properly injected repositories.
 */
export function UseCasesProvider({ children }: UseCasesProviderProps) {
  const client = useApolloClient();

  const useCases = useMemo(
    () => ({
      getTasksUseCase: createGetTasksUseCase(client),
    }),
    [client],
  );

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
