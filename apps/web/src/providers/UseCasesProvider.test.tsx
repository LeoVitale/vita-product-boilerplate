import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { UseCasesProvider, useUseCases } from './UseCasesProvider';
import { ReactNode } from 'react';

describe('UseCasesProvider', () => {
  it('given_provider_when_useUseCases_called_then_returns_use_cases', () => {
    // arrange
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ApolloProvider client={client}>
        <UseCasesProvider>{children}</UseCasesProvider>
      </ApolloProvider>
    );

    // act
    const { result } = renderHook(() => useUseCases(), { wrapper });

    // assert
    expect(result.current).toBeDefined();
    expect(result.current.getTasksUseCase).toBeDefined();
    expect(result.current.getTasksUseCase.execute).toBeInstanceOf(Function);
  });

  it('given_no_provider_when_useUseCases_called_then_throws_error', () => {
    // arrange & act & assert
    expect(() => {
      renderHook(() => useUseCases());
    }).toThrow('useUseCases must be used within UseCasesProvider');
  });
});
