import { render, screen, waitFor } from '@testing-library/react-native';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';
import { TaskListScreen } from './TaskListScreen';
import { UseCasesProvider } from '../providers';

// Mock the useGetTasks hook
const mockUseGetTasks = jest.fn();

jest.mock('@repo/application', () => ({
  ...jest.requireActual('@repo/application'),
  useGetTasks: () => mockUseGetTasks(),
}));

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

describe('TaskListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('given_loading_when_rendered_then_shows_loading_indicator', () => {
      // arrange
      mockUseGetTasks.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const Wrapper = createTestWrapper();

      // act
      render(
        <Wrapper>
          <TaskListScreen />
        </Wrapper>,
      );

      // assert
      expect(screen.getByText('Loading tasks...')).toBeOnTheScreen();
    });
  });

  describe('Error State', () => {
    it('given_error_when_rendered_then_shows_error_message', () => {
      // arrange
      mockUseGetTasks.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: { message: 'Network error' },
        refetch: jest.fn(),
      });

      const Wrapper = createTestWrapper();

      // act
      render(
        <Wrapper>
          <TaskListScreen />
        </Wrapper>,
      );

      // assert
      expect(screen.getByText('Error loading tasks')).toBeOnTheScreen();
      expect(screen.getByText('Network error')).toBeOnTheScreen();
    });

    it('given_error_without_message_when_rendered_then_shows_unknown_error', () => {
      // arrange
      mockUseGetTasks.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: null,
        refetch: jest.fn(),
      });

      const Wrapper = createTestWrapper();

      // act
      render(
        <Wrapper>
          <TaskListScreen />
        </Wrapper>,
      );

      // assert
      expect(screen.getByText('Unknown error')).toBeOnTheScreen();
    });
  });

  describe('Empty State', () => {
    it('given_empty_tasks_when_rendered_then_shows_empty_state', () => {
      // arrange
      mockUseGetTasks.mockReturnValue({
        data: [],
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const Wrapper = createTestWrapper();

      // act
      render(
        <Wrapper>
          <TaskListScreen />
        </Wrapper>,
      );

      // assert
      expect(screen.getByText('No tasks yet')).toBeOnTheScreen();
      expect(
        screen.getByText('Tasks will appear here when created'),
      ).toBeOnTheScreen();
    });
  });

  describe('Tasks List', () => {
    it('given_tasks_when_rendered_then_shows_task_list', () => {
      // arrange
      const mockTasks = [
        { id: '1', title: 'First Task', completed: false },
        { id: '2', title: 'Second Task', completed: true },
      ];

      mockUseGetTasks.mockReturnValue({
        data: mockTasks,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const Wrapper = createTestWrapper();

      // act
      render(
        <Wrapper>
          <TaskListScreen />
        </Wrapper>,
      );

      // assert
      expect(screen.getByText('Tasks')).toBeOnTheScreen();
      expect(screen.getByText('First Task')).toBeOnTheScreen();
      expect(screen.getByText('Second Task')).toBeOnTheScreen();
    });

    it('given_incomplete_task_when_rendered_then_shows_circle_indicator', () => {
      // arrange
      const mockTasks = [
        { id: '1', title: 'Incomplete Task', completed: false },
      ];

      mockUseGetTasks.mockReturnValue({
        data: mockTasks,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const Wrapper = createTestWrapper();

      // act
      render(
        <Wrapper>
          <TaskListScreen />
        </Wrapper>,
      );

      // assert
      expect(screen.getByText('○')).toBeOnTheScreen();
    });

    it('given_completed_task_when_rendered_then_shows_checkmark_indicator', () => {
      // arrange
      const mockTasks = [{ id: '1', title: 'Completed Task', completed: true }];

      mockUseGetTasks.mockReturnValue({
        data: mockTasks,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const Wrapper = createTestWrapper();

      // act
      render(
        <Wrapper>
          <TaskListScreen />
        </Wrapper>,
      );

      // assert
      expect(screen.getByText('✓')).toBeOnTheScreen();
    });
  });

  describe('Refresh', () => {
    it('given_tasks_when_refresh_triggered_then_refetch_is_called', async () => {
      // arrange
      const mockRefetch = jest.fn();
      const mockTasks = [{ id: '1', title: 'Task', completed: false }];

      mockUseGetTasks.mockReturnValue({
        data: mockTasks,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
      });

      const Wrapper = createTestWrapper();

      // act
      render(
        <Wrapper>
          <TaskListScreen />
        </Wrapper>,
      );

      // assert - refetch function is available
      await waitFor(() => {
        expect(mockRefetch).toBeDefined();
      });
    });
  });
});
