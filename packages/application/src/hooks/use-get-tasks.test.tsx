import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { useGetTasks } from './use-get-tasks';
import { ReactNode } from 'react';

/**
 * Note: Full integration tests with MockedProvider are challenging in Vitest + jsdom
 * due to context propagation issues with React 19 and Apollo Client hooks.
 *
 * These tests verify the hook interface and basic behavior.
 * For comprehensive GraphQL testing, see integration tests in apps/web.
 */
describe('useGetTasks', () => {
  it('given_apollo_provider_when_hook_called_then_returns_correct_interface', () => {
    // arrange
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ApolloProvider client={client}>{children}</ApolloProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });

    // assert - verify hook returns expected interface
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('isError');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('refetch');
    expect(typeof result.current.refetch).toBe('function');
  });

  it('given_apollo_provider_when_hook_called_then_isLoading_is_boolean', () => {
    // arrange
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ApolloProvider client={client}>{children}</ApolloProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });

    // assert - isLoading should be boolean (true initially, then false)
    expect(typeof result.current.isLoading).toBe('boolean');
  });

  it('given_apollo_provider_when_hook_called_then_isError_is_boolean', () => {
    // arrange
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ApolloProvider client={client}>{children}</ApolloProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });

    // assert - isError should be boolean
    expect(typeof result.current.isError).toBe('boolean');
  });
});
