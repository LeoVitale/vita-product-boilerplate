import { Task, TaskSchema } from '@repo/domain';

/**
 * Task Mapper
 *
 * Centralizes the mapping and validation of external data to domain entities.
 * This ensures that all data entering the domain layer is properly validated
 * and conforms to the expected schema.
 */
export const TaskMapper = {
  /**
   * Maps raw external data to a validated Task entity
   *
   * @param raw - Raw data from external source (GraphQL, REST, etc.)
   * @returns Validated Task entity
   * @throws ZodError if validation fails
   */
  toDomain(raw: unknown): Task {
    return TaskSchema.parse(raw);
  },

  /**
   * Maps an array of raw data to validated Task entities
   *
   * @param rawList - Array of raw data from external source
   * @returns Array of validated Task entities
   * @throws ZodError if any item fails validation
   */
  toDomainList(rawList: unknown[]): Task[] {
    return rawList.map((raw) => TaskSchema.parse(raw));
  },

  /**
   * Safely maps raw data to a Task entity, returning null on failure
   *
   * @param raw - Raw data from external source
   * @returns Validated Task entity or null if validation fails
   */
  toDomainSafe(raw: unknown): Task | null {
    const result = TaskSchema.safeParse(raw);
    return result.success ? result.data : null;
  },

  /**
   * Safely maps an array of raw data to Task entities, filtering out invalid items
   *
   * @param rawList - Array of raw data from external source
   * @returns Array of validated Task entities (invalid items are excluded)
   */
  toDomainListSafe(rawList: unknown[]): Task[] {
    return rawList
      .map((raw) => TaskSchema.safeParse(raw))
      .filter(
        (result): result is { success: true; data: Task } => result.success,
      )
      .map((result) => result.data);
  },
};
