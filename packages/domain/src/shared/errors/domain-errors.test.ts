import { describe, it, expect } from 'vitest';
import {
  DomainError,
  NotFoundError,
  ValidationError,
  NetworkError,
  UnauthorizedError,
  isDomainError,
} from './domain-errors';

describe('NotFoundError', () => {
  it('given_entity_and_id_when_created_then_has_correct_message', () => {
    // arrange & act
    const error = new NotFoundError('Task', '123');

    // assert
    expect(error.message).toBe('Task with id "123" not found');
    expect(error.entity).toBe('Task');
    expect(error.id).toBe('123');
    expect(error.code).toBe('NOT_FOUND');
    expect(error.name).toBe('NotFoundError');
  });

  it('given_not_found_error_when_instanceof_check_then_is_domain_error', () => {
    // arrange
    const error = new NotFoundError('Task', '123');

    // assert
    expect(error).toBeInstanceOf(DomainError);
    expect(error).toBeInstanceOf(Error);
  });
});

describe('ValidationError', () => {
  it('given_message_when_created_then_has_correct_properties', () => {
    // arrange & act
    const error = new ValidationError('Invalid title');

    // assert
    expect(error.message).toBe('Invalid title');
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.field).toBeUndefined();
  });

  it('given_message_and_field_when_created_then_has_field', () => {
    // arrange & act
    const error = new ValidationError('Title too short', 'title');

    // assert
    expect(error.message).toBe('Title too short');
    expect(error.field).toBe('title');
  });

  it('given_message_field_and_details_when_created_then_has_details', () => {
    // arrange & act
    const error = new ValidationError('Validation failed', 'title', {
      minLength: 3,
      received: 2,
    });

    // assert
    expect(error.details).toEqual({ minLength: 3, received: 2 });
  });
});

describe('NetworkError', () => {
  it('given_message_when_created_then_has_correct_properties', () => {
    // arrange & act
    const error = new NetworkError('Connection failed');

    // assert
    expect(error.message).toBe('Connection failed');
    expect(error.code).toBe('NETWORK_ERROR');
    expect(error.originalError).toBeUndefined();
  });

  it('given_message_and_original_error_when_created_then_wraps_original', () => {
    // arrange
    const originalError = new Error('ECONNREFUSED');

    // act
    const error = new NetworkError('Connection failed', originalError);

    // assert
    expect(error.originalError).toBe(originalError);
    expect(error.originalError?.message).toBe('ECONNREFUSED');
  });
});

describe('UnauthorizedError', () => {
  it('given_no_message_when_created_then_has_default_message', () => {
    // arrange & act
    const error = new UnauthorizedError();

    // assert
    expect(error.message).toBe('Unauthorized access');
    expect(error.code).toBe('UNAUTHORIZED');
  });

  it('given_custom_message_when_created_then_uses_custom_message', () => {
    // arrange & act
    const error = new UnauthorizedError('Token expired');

    // assert
    expect(error.message).toBe('Token expired');
  });
});

describe('isDomainError', () => {
  it('given_domain_error_when_checked_then_returns_true', () => {
    // arrange
    const notFoundError = new NotFoundError('Task', '123');
    const validationError = new ValidationError('Invalid');
    const networkError = new NetworkError('Failed');
    const unauthorizedError = new UnauthorizedError();

    // assert
    expect(isDomainError(notFoundError)).toBe(true);
    expect(isDomainError(validationError)).toBe(true);
    expect(isDomainError(networkError)).toBe(true);
    expect(isDomainError(unauthorizedError)).toBe(true);
  });

  it('given_regular_error_when_checked_then_returns_false', () => {
    // arrange
    const error = new Error('Regular error');

    // assert
    expect(isDomainError(error)).toBe(false);
  });

  it('given_non_error_when_checked_then_returns_false', () => {
    // assert
    expect(isDomainError('string')).toBe(false);
    expect(isDomainError(null)).toBe(false);
    expect(isDomainError(undefined)).toBe(false);
    expect(isDomainError({})).toBe(false);
  });
});
