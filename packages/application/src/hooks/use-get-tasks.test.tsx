import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { GetTasksDocument } from '@repo/graphql';
import { useGetTasks } from './use-get-tasks';
import { ReactNode } from 'react';

describe('useGetTasks', () => {
  it('given_valid_query_when_hook_called_then_returns_tasks', async () => {
    // arrange
    const mocks = [
      {
        request: {
          query: GetTasksDocument,
        },
        result: {
          data: {
            tasks: [
              { id: '1', title: 'Task 1', completed: false },
              { id: '2', title: 'Task 2', completed: true },
            ],
          },
        },
      },
    ];

    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });

    // assert - initially loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // wait for data
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].title).toBe('Task 1');
    expect(result.current.isError).toBe(false);
  });

  it('given_loading_state_when_hook_called_then_returns_loading_true', () => {
    // arrange
    const mocks = [
      {
        request: {
          query: GetTasksDocument,
        },
        result: {
          data: { tasks: [] },
        },
        delay: 100, // simulate network delay
      },
    ];

    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });

    // assert
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('given_error_state_when_hook_called_then_returns_error', async () => {
    // arrange
    const mocks = [
      {
        request: {
          query: GetTasksDocument,
        },
        error: new Error('Network error'),
      },
    ];

    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });

    // wait for error
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // assert
    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it('given_cache_and_network_policy_when_refetch_then_updates_data', async () => {
    // arrange
    const mocks = [
      {
        request: {
          query: GetTasksDocument,
        },
        result: {
          data: {
            tasks: [{ id: '1', title: 'Initial Task', completed: false }],
          },
        },
      },
      {
        request: {
          query: GetTasksDocument,
        },
        result: {
          data: {
            tasks: [{ id: '2', title: 'Updated Task', completed: true }],
          },
        },
      },
    ];

    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });

    // wait for initial data
    await waitFor(() => {
      expect(result.current.data).toHaveLength(1);
    });

    expect(result.current.data?.[0].title).toBe('Initial Task');

    // refetch
    await result.current.refetch();

    // assert - data updated
    await waitFor(() => {
      expect(result.current.data?.[0].title).toBe('Updated Task');
    });
  });
});

