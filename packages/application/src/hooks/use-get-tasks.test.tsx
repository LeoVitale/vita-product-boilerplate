import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGetTasks, TasksQueryProvider } from './use-get-tasks';
import { ReactNode } from 'react';
import { TasksQueryResult } from '@repo/domain';

/**
 * Creates a mock tasks query function for testing
 */
function createMockTasksQuery(
  overrides?: Partial<TasksQueryResult>,
): () => TasksQueryResult {
  return () => ({
    data: undefined,
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
    ...overrides,
  });
}

describe('useGetTasks', () => {
  it('given_provider_when_hook_called_then_returns_correct_interface', () => {
    // arrange
    const mockQuery = createMockTasksQuery();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <TasksQueryProvider value={mockQuery}>{children}</TasksQueryProvider>
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

  it('given_provider_with_tasks_when_hook_called_then_returns_tasks', () => {
    // arrange
    const mockTasks = [
      { id: '1', title: 'Task One', completed: false },
      { id: '2', title: 'Task Two', completed: true },
    ];
    const mockQuery = createMockTasksQuery({ data: mockTasks });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <TasksQueryProvider value={mockQuery}>{children}</TasksQueryProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });

    // assert
    expect(result.current.data).toEqual(mockTasks);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('given_provider_with_loading_when_hook_called_then_isLoading_is_true', () => {
    // arrange
    const mockQuery = createMockTasksQuery({ isLoading: true });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <TasksQueryProvider value={mockQuery}>{children}</TasksQueryProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });

    // assert
    expect(result.current.isLoading).toBe(true);
  });

  it('given_provider_with_error_when_hook_called_then_isError_is_true', () => {
    // arrange
    const error = new Error('Network error');
    const mockQuery = createMockTasksQuery({
      isError: true,
      error,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <TasksQueryProvider value={mockQuery}>{children}</TasksQueryProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });

    // assert
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(error);
  });

  it('given_provider_when_refetch_called_then_calls_underlying_refetch', () => {
    // arrange
    const mockRefetch = vi.fn();
    const mockQuery = createMockTasksQuery({ refetch: mockRefetch });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <TasksQueryProvider value={mockQuery}>{children}</TasksQueryProvider>
    );

    // act
    const { result } = renderHook(() => useGetTasks(), { wrapper });
    result.current.refetch();

    // assert
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('given_no_provider_when_hook_called_then_throws_error', () => {
    // arrange & act & assert
    expect(() => {
      renderHook(() => useGetTasks());
    }).toThrow('useGetTasks must be used within TasksQueryProvider');
  });
});
