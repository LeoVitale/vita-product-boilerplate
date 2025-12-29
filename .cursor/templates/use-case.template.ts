/**
 * TEMPLATE: Use Case
 *
 * Use this as reference when creating new use cases.
 * Copy and replace [EntityName] with your entity name.
 *
 * Location: packages/application/src/features/[feature-name]/use-cases/[action]-[entity].use-case.ts
 */

import {
  EntityName,
  EntityNameRepositoryInterface,
  CreateEntityNameInput,
  Result,
  DomainError,
  ok,
  fail,
} from '@repo/domain';

// =============================================================================
// Interface
// =============================================================================

/**
 * Interface for GetEntityNames use case
 *
 * Allows for different implementations and easier testing
 */
export interface IGetEntityNamesUseCase {
  execute(): Promise<Result<EntityName[], DomainError>>;
}

// =============================================================================
// Implementation
// =============================================================================

/**
 * Use case for retrieving all [entities]
 *
 * This use case orchestrates fetching all [entities],
 * delegating to the repository for data access.
 *
 * Business logic can be added here, such as:
 * - Filtering based on user permissions
 * - Sorting or grouping
 * - Computing derived data
 * - Validating business rules
 */
export class GetEntityNamesUseCase implements IGetEntityNamesUseCase {
  constructor(private readonly entityNameRepo: EntityNameRepositoryInterface) {}

  async execute(): Promise<Result<EntityName[], DomainError>> {
    // Add business logic here if needed
    // Example: filter by current user's permissions
    return this.entityNameRepo.findAll();
  }
}

// =============================================================================
// Create Use Case Example
// =============================================================================

export interface ICreateEntityNameUseCase {
  execute(
    input: CreateEntityNameInput,
  ): Promise<Result<EntityName, DomainError>>;
}

/**
 * Use case for creating a new [entity]
 *
 * Validates input and delegates to repository.
 * Add business validation rules here.
 */
export class CreateEntityNameUseCase implements ICreateEntityNameUseCase {
  constructor(private readonly entityNameRepo: EntityNameRepositoryInterface) {}

  async execute(
    input: CreateEntityNameInput,
  ): Promise<Result<EntityName, DomainError>> {
    // Business validation example
    if (this.containsForbiddenWord(input.requiredField)) {
      return fail({
        code: 'VALIDATION_ERROR',
        message: 'Input contains forbidden content',
      });
    }

    // Additional business logic
    // Example: check for duplicates
    const existingResult = await this.entityNameRepo.findAll({
      searchTerm: input.requiredField,
    });

    if (existingResult.ok && existingResult.value.length > 0) {
      return fail({
        code: 'DUPLICATE_ERROR',
        message: 'An entity with this name already exists',
      });
    }

    // Delegate to repository
    return this.entityNameRepo.create(input);
  }

  private containsForbiddenWord(text: string): boolean {
    // Example business rule
    const forbidden = ['spam', 'test'];
    return forbidden.some((word) => text.toLowerCase().includes(word));
  }
}

// =============================================================================
// Use Case with Multiple Dependencies
// =============================================================================

export interface IComplexUseCase {
  execute(
    id: string,
  ): Promise<Result<{ entity: EntityName; relatedCount: number }, DomainError>>;
}

/**
 * Example use case with multiple repository dependencies
 *
 * Shows how to compose data from multiple sources
 */
export class ComplexUseCase implements IComplexUseCase {
  constructor(
    private readonly entityNameRepo: EntityNameRepositoryInterface,
    // private readonly otherRepo: OtherRepositoryInterface,
  ) {}

  async execute(
    id: string,
  ): Promise<
    Result<{ entity: EntityName; relatedCount: number }, DomainError>
  > {
    // Fetch main entity
    const entityResult = await this.entityNameRepo.findById(id);

    if (!entityResult.ok) {
      return entityResult;
    }

    if (!entityResult.value) {
      return fail({
        code: 'NOT_FOUND',
        message: `Entity with id ${id} not found`,
      });
    }

    // Fetch related data (example)
    // const relatedResult = await this.otherRepo.countByEntityId(id);

    // Compose result
    return ok({
      entity: entityResult.value,
      relatedCount: 0, // relatedResult.value
    });
  }
}
