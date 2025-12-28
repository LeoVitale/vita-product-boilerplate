import { renderHook } from '@testing-library/react-native';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';
import { UseCasesProvider, useUseCases } from './UseCasesProvider';

/**
 * Creates a test wrapper with Apollo and UseCases providers
 */
function createTestWrapper() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  });

  function TestWrapper({ children }: Readonly<{ children: ReactNode }>) {
    return (
      <ApolloProvider client={client}>
        <UseCasesProvider>{children}</UseCasesProvider>
      </ApolloProvider>
    );
  }

  return TestWrapper;
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
      rerender({});

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
});
