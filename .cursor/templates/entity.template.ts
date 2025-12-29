/**
 * TEMPLATE: Domain Entity with Zod
 *
 * Use this as reference when creating new entities.
 * Copy and replace [EntityName] with your entity name.
 *
 * Location: packages/domain/src/features/[feature-name]/entities/[entity].ts
 */

import { z } from 'zod';

// =============================================================================
// Main Entity Schema
// =============================================================================

/**
 * [EntityName] Entity Schema
 *
 * Represents a [description] in the domain layer with full validation.
 * All external data must be validated through this schema before
 * being used in the application.
 */
export const EntityNameSchema = z.object({
  /** Unique identifier */
  id: z.string(),

  /** [Description of field] */
  requiredField: z.string().min(1),

  /** [Description of optional field] */
  optionalField: z.string().nullable().optional(),

  /** [Description of enum field] */
  status: z.enum(['active', 'inactive', 'pending']).default('pending'),

  /** [Description of number field] */
  count: z.number().int().nonnegative().default(0),

  /** [Description of boolean field] */
  isEnabled: z.boolean().default(true),

  /** Creation timestamp */
  createdAt: z.coerce.date(),

  /** Last update timestamp */
  updatedAt: z.coerce.date(),
});

/** Inferred type from schema */
export type EntityName = z.infer<typeof EntityNameSchema>;

// =============================================================================
// Input Schemas
// =============================================================================

/**
 * Input schema for creating a new [EntityName]
 *
 * Excludes auto-generated fields (id, timestamps)
 */
export const CreateEntityNameInputSchema = z.object({
  requiredField: z.string().min(1),
  optionalField: z.string().nullable().optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
});

export type CreateEntityNameInput = z.infer<typeof CreateEntityNameInputSchema>;

/**
 * Input schema for updating a [EntityName]
 *
 * All fields optional for partial updates
 */
export const UpdateEntityNameInputSchema = z.object({
  requiredField: z.string().min(1).optional(),
  optionalField: z.string().nullable().optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
  isEnabled: z.boolean().optional(),
});

export type UpdateEntityNameInput = z.infer<typeof UpdateEntityNameInputSchema>;

// =============================================================================
// Query/Filter Schemas (optional)
// =============================================================================

/**
 * Schema for filtering [EntityName] queries
 */
export const EntityNameFilterSchema = z.object({
  status: z.enum(['active', 'inactive', 'pending']).optional(),
  isEnabled: z.boolean().optional(),
  searchTerm: z.string().optional(),
});

export type EntityNameFilter = z.infer<typeof EntityNameFilterSchema>;
