/**
 * TEMPLATE: Apollo Repository Implementation
 *
 * Use this as reference when implementing repositories with Apollo Client.
 * Copy and replace [EntityName] with your entity name.
 *
 * Location: packages/infrastructure/src/features/[feature-name]/repositories/apollo-[entity].repository.ts
 */

import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  EntityNameRepositoryInterface,
  EntityName,
  CreateEntityNameInput,
  UpdateEntityNameInput,
  EntityNameFilter,
  Result,
  DomainError,
  ok,
  fail,
} from '@repo/domain';
import { EntityNameMapper } from '../mappers/entity-name.mapper';
import {
  GetEntityNamesDocument,
  GetEntityNameDocument,
  CreateEntityNameDocument,
  UpdateEntityNameDocument,
  DeleteEntityNameDocument,
  // Import generated types
  GetEntityNamesQuery,
  CreateEntityNameMutation,
} from '@repo/graphql';

/**
 * Apollo Client implementation of EntityNameRepositoryInterface
 *
 * Handles all GraphQL operations for [entities] and maps
 * API responses to domain entities.
 *
 * Error handling: All errors are caught and returned as Result failures,
 * never thrown.
 */
export class ApolloEntityNameRepository implements EntityNameRepositoryInterface {
  constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {}

  // ===========================================================================
  // Query Operations
  // ===========================================================================

  async findAll(
    filter?: EntityNameFilter,
  ): Promise<Result<EntityName[], DomainError>> {
    try {
      const { data, error } = await this.client.query<GetEntityNamesQuery>({
        query: GetEntityNamesDocument,
        variables: { filter },
        fetchPolicy: 'network-only', // Ensure fresh data
      });

      if (error) {
        return fail({
          code: 'GRAPHQL_ERROR',
          message: error.message,
          cause: error,
        });
      }

      // Map GraphQL response to domain entities
      const entities = data.entityNames.map(EntityNameMapper.toDomain);
      return ok(entities);
    } catch (error) {
      return this.handleError(error, 'Failed to fetch entities');
    }
  }

  async findById(id: string): Promise<Result<EntityName | null, DomainError>> {
    try {
      const { data, error } = await this.client.query({
        query: GetEntityNameDocument,
        variables: { id },
        fetchPolicy: 'network-only',
      });

      if (error) {
        return fail({
          code: 'GRAPHQL_ERROR',
          message: error.message,
          cause: error,
        });
      }

      if (!data.entityName) {
        return ok(null);
      }

      return ok(EntityNameMapper.toDomain(data.entityName));
    } catch (error) {
      return this.handleError(error, `Failed to fetch entity ${id}`);
    }
  }

  async exists(id: string): Promise<Result<boolean, DomainError>> {
    const result = await this.findById(id);
    if (!result.ok) return result;
    return ok(result.value !== null);
  }

  // ===========================================================================
  // Mutation Operations
  // ===========================================================================

  async create(
    input: CreateEntityNameInput,
  ): Promise<Result<EntityName, DomainError>> {
    try {
      const { data, errors } =
        await this.client.mutate<CreateEntityNameMutation>({
          mutation: CreateEntityNameDocument,
          variables: { input },
          // Optionally update cache
          // update: (cache, { data }) => { ... }
        });

      if (errors && errors.length > 0) {
        return fail({
          code: 'GRAPHQL_ERROR',
          message: errors[0].message,
          cause: errors,
        });
      }

      if (!data?.createEntityName) {
        return fail({
          code: 'NO_DATA',
          message: 'No data returned from mutation',
        });
      }

      return ok(EntityNameMapper.toDomain(data.createEntityName));
    } catch (error) {
      return this.handleError(error, 'Failed to create entity');
    }
  }

  async update(
    id: string,
    input: UpdateEntityNameInput,
  ): Promise<Result<EntityName, DomainError>> {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: UpdateEntityNameDocument,
        variables: { id, input },
      });

      if (errors && errors.length > 0) {
        return fail({
          code: 'GRAPHQL_ERROR',
          message: errors[0].message,
          cause: errors,
        });
      }

      if (!data?.updateEntityName) {
        return fail({
          code: 'NOT_FOUND',
          message: `Entity with id ${id} not found`,
        });
      }

      return ok(EntityNameMapper.toDomain(data.updateEntityName));
    } catch (error) {
      return this.handleError(error, `Failed to update entity ${id}`);
    }
  }

  async delete(id: string): Promise<Result<EntityName, DomainError>> {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: DeleteEntityNameDocument,
        variables: { id },
      });

      if (errors && errors.length > 0) {
        return fail({
          code: 'GRAPHQL_ERROR',
          message: errors[0].message,
          cause: errors,
        });
      }

      if (!data?.deleteEntityName) {
        return fail({
          code: 'NOT_FOUND',
          message: `Entity with id ${id} not found`,
        });
      }

      return ok(EntityNameMapper.toDomain(data.deleteEntityName));
    } catch (error) {
      return this.handleError(error, `Failed to delete entity ${id}`);
    }
  }

  async toggleEnabled(id: string): Promise<Result<EntityName, DomainError>> {
    // First fetch current state
    const current = await this.findById(id);
    if (!current.ok) return current;
    if (!current.value) {
      return fail({ code: 'NOT_FOUND', message: `Entity ${id} not found` });
    }

    // Toggle and update
    return this.update(id, { isEnabled: !current.value.isEnabled });
  }

  async bulkDelete(ids: string[]): Promise<Result<number, DomainError>> {
    // Implementation depends on your GraphQL API
    // This is a simple sequential implementation
    let deletedCount = 0;

    for (const id of ids) {
      const result = await this.delete(id);
      if (result.ok) deletedCount++;
    }

    return ok(deletedCount);
  }

  // ===========================================================================
  // Error Handling
  // ===========================================================================

  private handleError(
    error: unknown,
    message: string,
  ): Result<never, DomainError> {
    console.error(message, error);

    if (error instanceof Error) {
      // Handle network errors
      if (error.message.includes('Network')) {
        return fail({
          code: 'NETWORK_ERROR',
          message: 'Network connection failed',
          cause: error,
        });
      }

      // Handle authentication errors
      if (
        error.message.includes('Unauthorized') ||
        error.message.includes('401')
      ) {
        return fail({
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
          cause: error,
        });
      }

      return fail({
        code: 'UNKNOWN_ERROR',
        message: error.message,
        cause: error,
      });
    }

    return fail({
      code: 'UNKNOWN_ERROR',
      message,
      cause: error,
    });
  }
}
