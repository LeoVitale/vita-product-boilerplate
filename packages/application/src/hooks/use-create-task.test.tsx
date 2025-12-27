import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCreateTask, CreateTaskMutationProvider } from './use-create-task';
import { ReactNode } from 'react';
import { CreateTaskMutationResult, success } from '@repo/domain';

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: null,
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/**
 * Creates a mock create task mutation for testing
 */
function createMockMutation(
  overrides?: Partial<CreateTaskMutationResult>,
): () => CreateTaskMutationResult {
  return () => ({
    create: vi.fn().mockResolvedValue(success(mockTask)),
    isLoading: false,
    isError: false,
    error: null,
    data: undefined,
    reset: vi.fn(),
    ...overrides,
  });
}

describe('useCreateTask', () => {
  it('given_provider_when_hook_called_then_returns_correct_interface', () => {
    // arrange
    const mockMutation = createMockMutation();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <CreateTaskMutationProvider value={mockMutation}>
        {children}
      </CreateTaskMutationProvider>
    );

    // act
    const { result } = renderHook(() => useCreateTask(), { wrapper });

    // assert
    expect(result.current).toHaveProperty('create');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('isError');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('reset');
    expect(typeof result.current.create).toBe('function');
  });

  it('given_provider_with_loading_when_hook_called_then_isLoading_is_true', () => {
    // arrange
    const mockMutation = createMockMutation({ isLoading: true });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <CreateTaskMutationProvider value={mockMutation}>
        {children}
      </CreateTaskMutationProvider>
    );

    // act
    const { result } = renderHook(() => useCreateTask(), { wrapper });

    // assert
    expect(result.current.isLoading).toBe(true);
  });

  it('given_no_provider_when_hook_called_then_throws_error', () => {
    // act & assert
    expect(() => {
      renderHook(() => useCreateTask());
    }).toThrow('useCreateTask must be used within CreateTaskMutationProvider');
  });
});

