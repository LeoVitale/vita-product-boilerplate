/**
 * TEMPLATE: Repository Interface
 *
 * Use this as reference when creating new repository interfaces.
 * Copy and replace [EntityName] with your entity name.
 *
 * Location: packages/domain/src/features/[feature-name]/repositories/[entity]-repository.interface.ts
 */

import { Result } from '../../../shared/core/result';
import {
  EntityName,
  CreateEntityNameInput,
  UpdateEntityNameInput,
  EntityNameFilter,
} from '../entities/entity-name';
import { DomainError } from '../../../shared/errors/domain-errors';

/**
 * [EntityName] Repository Interface
 *
 * Defines the contract for [entity] data operations. Implementations
 * can use any data source (GraphQL, REST, local storage, etc.)
 * while the application layer remains agnostic.
 *
 * All methods return Result<T, DomainError> to handle errors
 * without throwing exceptions.
 */
export interface EntityNameRepositoryInterface {
  // ===========================================================================
  // Query Operations
  // ===========================================================================

  /**
   * Retrieves all [entities], optionally filtered
   *
   * @param filter - Optional filter criteria
   * @returns List of [entities] or error
   */
  findAll(
    filter?: EntityNameFilter,
  ): Promise<Result<EntityName[], DomainError>>;

  /**
   * Retrieves a single [entity] by ID
   *
   * @param id - Unique identifier
   * @returns [Entity] if found, null if not found, or error
   */
  findById(id: string): Promise<Result<EntityName | null, DomainError>>;

  /**
   * Checks if a [entity] exists
   *
   * @param id - Unique identifier
   * @returns Boolean indicating existence or error
   */
  exists(id: string): Promise<Result<boolean, DomainError>>;

  // ===========================================================================
  // Mutation Operations
  // ===========================================================================

  /**
   * Creates a new [entity]
   *
   * @param input - Creation data
   * @returns Newly created [entity] or error
   */
  create(
    input: CreateEntityNameInput,
  ): Promise<Result<EntityName, DomainError>>;

  /**
   * Updates an existing [entity]
   *
   * @param id - Unique identifier
   * @param input - Update data (partial)
   * @returns Updated [entity] or error
   */
  update(
    id: string,
    input: UpdateEntityNameInput,
  ): Promise<Result<EntityName, DomainError>>;

  /**
   * Deletes a [entity] by ID
   *
   * @param id - Unique identifier
   * @returns Deleted [entity] or error
   */
  delete(id: string): Promise<Result<EntityName, DomainError>>;

  // ===========================================================================
  // Business-Specific Operations (examples)
  // ===========================================================================

  /**
   * Toggles a boolean property
   *
   * @param id - Unique identifier
   * @returns Updated [entity] or error
   */
  toggleEnabled(id: string): Promise<Result<EntityName, DomainError>>;

  /**
   * Bulk operation example
   *
   * @param ids - Array of identifiers
   * @returns Number of affected items or error
   */
  bulkDelete(ids: string[]): Promise<Result<number, DomainError>>;
}
