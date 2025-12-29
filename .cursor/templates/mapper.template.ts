/**
 * TEMPLATE: Entity Mapper
 *
 * Use this as reference when creating mappers between GraphQL and Domain types.
 * Copy and replace [EntityName] with your entity name.
 *
 * Location: packages/infrastructure/src/features/[feature-name]/mappers/[entity].mapper.ts
 */

import { EntityName, EntityNameSchema } from '@repo/domain';
// Import the generated GraphQL type
// import { EntityNameFragment } from '@repo/graphql';

/**
 * Raw GraphQL type (before mapping)
 *
 * In practice, this comes from @repo/graphql generated types.
 * Defined here for template clarity.
 */
interface GraphQLEntityName {
  id: string;
  required_field: string; // snake_case from API
  optional_field: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING'; // UPPER_CASE enum from API
  count: number;
  is_enabled: boolean;
  created_at: string; // ISO string from API
  updated_at: string;
}

/**
 * EntityName Mapper
 *
 * Converts between GraphQL/API types and Domain entities.
 *
 * Responsibilities:
 * - Transform field names (snake_case → camelCase)
 * - Transform enum values (UPPER_CASE → lowercase)
 * - Parse date strings to Date objects
 * - Validate data through Zod schema
 *
 * This keeps the domain layer pure and isolated from
 * external API concerns.
 */
export class EntityNameMapper {
  /**
   * Maps GraphQL response to Domain entity
   *
   * Uses Zod schema to validate and parse the data.
   * Throws if data is invalid (should not happen with proper API).
   *
   * @param raw - Raw GraphQL response object
   * @returns Validated Domain entity
   */
  static toDomain(raw: GraphQLEntityName): EntityName {
    return EntityNameSchema.parse({
      id: raw.id,
      requiredField: raw.required_field,
      optionalField: raw.optional_field,
      status: raw.status.toLowerCase() as 'active' | 'inactive' | 'pending',
      count: raw.count,
      isEnabled: raw.is_enabled,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }

  /**
   * Maps Domain entity to GraphQL input
   *
   * Used when sending data to the API.
   * Transforms camelCase back to snake_case.
   *
   * @param entity - Domain entity
   * @returns Object ready for GraphQL mutation
   */
  static toGraphQL(entity: Partial<EntityName>): Partial<GraphQLEntityName> {
    const result: Partial<GraphQLEntityName> = {};

    if (entity.requiredField !== undefined) {
      result.required_field = entity.requiredField;
    }

    if (entity.optionalField !== undefined) {
      result.optional_field = entity.optionalField;
    }

    if (entity.status !== undefined) {
      result.status = entity.status.toUpperCase() as
        | 'ACTIVE'
        | 'INACTIVE'
        | 'PENDING';
    }

    if (entity.count !== undefined) {
      result.count = entity.count;
    }

    if (entity.isEnabled !== undefined) {
      result.is_enabled = entity.isEnabled;
    }

    return result;
  }

  /**
   * Safely maps GraphQL response, returning null on parse failure
   *
   * Use this when invalid data should be skipped rather than throwing.
   *
   * @param raw - Raw GraphQL response object
   * @returns Domain entity or null if invalid
   */
  static safeToDomain(raw: GraphQLEntityName): EntityName | null {
    const result = EntityNameSchema.safeParse({
      id: raw.id,
      requiredField: raw.required_field,
      optionalField: raw.optional_field,
      status: raw.status.toLowerCase(),
      count: raw.count,
      isEnabled: raw.is_enabled,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });

    if (result.success) {
      return result.data;
    }

    console.warn('Failed to parse entity:', result.error);
    return null;
  }

  /**
   * Maps an array of GraphQL responses to Domain entities
   *
   * Filters out any invalid items using safeToDomain.
   *
   * @param rawArray - Array of raw GraphQL responses
   * @returns Array of valid Domain entities
   */
  static toDomainArray(rawArray: GraphQLEntityName[]): EntityName[] {
    return rawArray
      .map((raw) => this.safeToDomain(raw))
      .filter((entity): entity is EntityName => entity !== null);
  }
}
