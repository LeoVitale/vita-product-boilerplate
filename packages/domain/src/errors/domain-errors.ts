/**
 * Base class for all domain errors
 *
 * Domain errors represent business rule violations or expected
 * failure cases that should be handled explicitly.
 */
export abstract class DomainError extends Error {
  abstract readonly code: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    // Maintains proper stack trace in V8 environments
    Error.captureStackTrace?.(this, this.constructor);
  }
}

/**
 * Error thrown when a requested entity is not found
 */
export class NotFoundError extends DomainError {
  readonly code = 'NOT_FOUND';

  constructor(
    public readonly entity: string,
    public readonly id: string,
  ) {
    super(`${entity} with id "${id}" not found`);
  }
}

/**
 * Error thrown when input validation fails
 */
export class ValidationError extends DomainError {
  readonly code = 'VALIDATION_ERROR';

  constructor(
    message: string,
    public readonly field?: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
  }
}

/**
 * Error thrown when a network operation fails
 */
export class NetworkError extends DomainError {
  readonly code = 'NETWORK_ERROR';

  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(message);
  }
}

/**
 * Error thrown when user is not authorized to perform an action
 */
export class UnauthorizedError extends DomainError {
  readonly code = 'UNAUTHORIZED';

  constructor(message: string = 'Unauthorized access') {
    super(message);
  }
}

/**
 * Type guard to check if an error is a DomainError
 */
export function isDomainError(error: unknown): error is DomainError {
  return error instanceof DomainError;
}

/**
 * Union type of all domain error types for exhaustive handling
 */
export type DomainErrorType =
  | NotFoundError
  | ValidationError
  | NetworkError
  | UnauthorizedError;
