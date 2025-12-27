/**
 * Shared Module - Public API
 *
 * Cross-cutting utilities used across all features.
 */

// Core
export { type Result, success, failure } from './core';

// Errors
export {
  DomainError,
  NotFoundError,
  ValidationError,
  NetworkError,
  UnauthorizedError,
  isDomainError,
  type DomainErrorType,
} from './errors';

