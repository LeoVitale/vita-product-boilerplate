import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useToggleTask, ToggleTaskMutationProvider } from './use-toggle-task';
import { ReactNode } from 'react';
import { ToggleTaskMutationResult, success } from '@repo/domain';

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: null,
  completed: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/**
 * Creates a mock toggle task mutation for testing
 */
function createMockMutation(
  overrides?: Partial<ToggleTaskMutationResult>,
): () => ToggleTaskMutationResult {
  return () => ({
    toggle: vi.fn().mockResolvedValue(success(mockTask)),
    isLoading: false,
    isError: false,
    error: null,
    data: undefined,
    reset: vi.fn(),
    ...overrides,
  });
}

describe('useToggleTask', () => {
  it('given_provider_when_hook_called_then_returns_correct_interface', () => {
    // arrange
    const mockMutation = createMockMutation();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ToggleTaskMutationProvider value={mockMutation}>
        {children}
      </ToggleTaskMutationProvider>
    );

    // act
    const { result } = renderHook(() => useToggleTask(), { wrapper });

    // assert
    expect(result.current).toHaveProperty('toggle');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('isError');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('reset');
    expect(typeof result.current.toggle).toBe('function');
  });

  it('given_provider_with_loading_when_hook_called_then_isLoading_is_true', () => {
    // arrange
    const mockMutation = createMockMutation({ isLoading: true });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ToggleTaskMutationProvider value={mockMutation}>
        {children}
      </ToggleTaskMutationProvider>
    );

    // act
    const { result } = renderHook(() => useToggleTask(), { wrapper });

    // assert
    expect(result.current.isLoading).toBe(true);
  });

  it('given_no_provider_when_hook_called_then_throws_error', () => {
    // act & assert
    expect(() => {
      renderHook(() => useToggleTask());
    }).toThrow('useToggleTask must be used within ToggleTaskMutationProvider');
  });
});

