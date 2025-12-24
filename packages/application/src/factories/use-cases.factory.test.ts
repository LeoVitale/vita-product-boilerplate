import { describe, it, expect, vi } from 'vitest';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createGetTasksUseCase } from './use-cases.factory';

describe('UseCases Factory', () => {
  it('given_apollo_client_when_create_get_tasks_use_case_then_returns_instance', () => {
    // arrange
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: 'http://localhost:4000/graphql',
    });

    // act
    const useCase = createGetTasksUseCase(client);

    // assert
    expect(useCase).toBeDefined();
    expect(useCase.execute).toBeInstanceOf(Function);
  });

  it('given_apollo_client_when_create_use_case_then_injects_repository', async () => {
    // arrange
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: 'http://localhost:4000/graphql',
    });

    // Mock the query method
    const mockQuery = vi.fn().mockResolvedValue({
      data: { tasks: [] },
    });
    client.query = mockQuery;

    // act
    const useCase = createGetTasksUseCase(client);
    const result = await useCase.execute();

    // assert
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(Array.isArray(result.value)).toBe(true);
    }
  });
});
