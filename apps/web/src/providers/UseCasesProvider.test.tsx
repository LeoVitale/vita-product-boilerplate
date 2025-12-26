import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { UseCasesProvider, useUseCases } from './UseCasesProvider';
import { useGetTasks } from '@repo/application';
import { ReactNode } from 'react';

/**
 * Creates a test wrapper with Apollo and UseCases providers
 */
function createTestWrapper() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  });

  return ({ children }: { children: ReactNode }) => (
    <ApolloProvider client={client}>
      <UseCasesProvider>{children}</UseCasesProvider>
    </ApolloProvider>
  );
}

describe('UseCasesProvider', () => {
  describe('useUseCases', () => {
    it('given_provider_when_useUseCases_called_then_returns_use_cases', () => {
      // arrange
      const wrapper = createTestWrapper();

      // act
      const { result } = renderHook(() => useUseCases(), { wrapper });

      // assert - verify use cases are available
      expect(result.current).toBeDefined();
      expect(result.current.getTasksUseCase).toBeDefined();
      expect(result.current.getTasksUseCase.execute).toBeInstanceOf(Function);
    });

    it('given_provider_when_useUseCases_called_then_use_case_is_stable_across_rerenders', () => {
      // arrange
      const wrapper = createTestWrapper();

      // act
      const { result, rerender } = renderHook(() => useUseCases(), { wrapper });
      const firstInstance = result.current.getTasksUseCase;

      // rerender
      rerender();

      // assert - use case instance should be stable (memoized)
      expect(result.current.getTasksUseCase).toBe(firstInstance);
    });

    it('given_no_provider_when_useUseCases_called_then_throws_error', () => {
      // arrange & act & assert
      expect(() => {
        renderHook(() => useUseCases());
      }).toThrow('useUseCases must be used within UseCasesProvider');
    });
  });

  describe('TasksQueryProvider integration', () => {
    it('given_provider_when_useGetTasks_called_then_returns_query_result', () => {
      // arrange
      const wrapper = createTestWrapper();

      // act
      const { result } = renderHook(() => useGetTasks(), { wrapper });

      // assert - verify query result interface is available
      expect(result.current).toBeDefined();
      expect(result.current).toHaveProperty('data');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('isError');
      expect(result.current).toHaveProperty('error');
      expect(result.current).toHaveProperty('refetch');
      expect(typeof result.current.refetch).toBe('function');
    });

    it('given_provider_when_useGetTasks_called_then_isLoading_is_boolean', () => {
      // arrange
      const wrapper = createTestWrapper();

      // act
      const { result } = renderHook(() => useGetTasks(), { wrapper });

      // assert
      expect(typeof result.current.isLoading).toBe('boolean');
    });

    it('given_no_provider_when_useGetTasks_called_then_throws_error', () => {
      // arrange & act & assert
      expect(() => {
        renderHook(() => useGetTasks());
      }).toThrow('useGetTasks must be used within TasksQueryProvider');
    });
  });
});
