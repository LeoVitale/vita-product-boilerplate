import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDeleteTask, DeleteTaskMutationProvider } from './use-delete-task';
import { ReactNode } from 'react';
import { DeleteTaskMutationResult, success } from '@repo/domain';

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: null,
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/**
 * Creates a mock delete task mutation for testing
 */
function createMockMutation(
  overrides?: Partial<DeleteTaskMutationResult>,
): () => DeleteTaskMutationResult {
  return () => ({
    remove: vi.fn().mockResolvedValue(success(mockTask)),
    isLoading: false,
    isError: false,
    error: null,
    data: undefined,
    reset: vi.fn(),
    ...overrides,
  });
}

describe('useDeleteTask', () => {
  it('given_provider_when_hook_called_then_returns_correct_interface', () => {
    // arrange
    const mockMutation = createMockMutation();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <DeleteTaskMutationProvider value={mockMutation}>
        {children}
      </DeleteTaskMutationProvider>
    );

    // act
    const { result } = renderHook(() => useDeleteTask(), { wrapper });

    // assert
    expect(result.current).toHaveProperty('remove');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('isError');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('reset');
    expect(typeof result.current.remove).toBe('function');
  });

  it('given_provider_with_loading_when_hook_called_then_isLoading_is_true', () => {
    // arrange
    const mockMutation = createMockMutation({ isLoading: true });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <DeleteTaskMutationProvider value={mockMutation}>
        {children}
      </DeleteTaskMutationProvider>
    );

    // act
    const { result } = renderHook(() => useDeleteTask(), { wrapper });

    // assert
    expect(result.current.isLoading).toBe(true);
  });

  it('given_no_provider_when_hook_called_then_throws_error', () => {
    // act & assert
    expect(() => {
      renderHook(() => useDeleteTask());
    }).toThrow('useDeleteTask must be used within DeleteTaskMutationProvider');
  });
});

