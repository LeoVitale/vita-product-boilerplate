import { describe, it, expect } from 'vitest';
import { success, failure, Result } from './result';

describe('Result', () => {
  describe('success', () => {
    it('given_value_when_success_then_ok_is_true', () => {
      // arrange
      const value = { id: '1', name: 'test' };

      // act
      const result = success(value);

      // assert
      expect(result.ok).toBe(true);
    });

    it('given_value_when_success_then_value_is_accessible', () => {
      // arrange
      const value = { id: '1', name: 'test' };

      // act
      const result = success(value);

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual(value);
      }
    });

    it('given_primitive_when_success_then_returns_correct_value', () => {
      // arrange & act
      const stringResult = success('test');
      const numberResult = success(42);
      const boolResult = success(true);

      // assert
      expect(stringResult.ok && stringResult.value).toBe('test');
      expect(numberResult.ok && numberResult.value).toBe(42);
      expect(boolResult.ok && boolResult.value).toBe(true);
    });

    it('given_array_when_success_then_returns_array', () => {
      // arrange
      const items = [1, 2, 3];

      // act
      const result = success(items);

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual([1, 2, 3]);
      }
    });

    it('given_null_when_success_then_returns_null', () => {
      // arrange & act
      const result = success(null);

      // assert
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toBeNull();
      }
    });
  });

  describe('failure', () => {
    it('given_error_when_failure_then_ok_is_false', () => {
      // arrange
      const error = new Error('Something went wrong');

      // act
      const result = failure(error);

      // assert
      expect(result.ok).toBe(false);
    });

    it('given_error_when_failure_then_error_is_accessible', () => {
      // arrange
      const error = new Error('Something went wrong');

      // act
      const result = failure(error);

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe(error);
        expect(result.error.message).toBe('Something went wrong');
      }
    });

    it('given_custom_error_type_when_failure_then_preserves_type', () => {
      // arrange
      class ValidationError extends Error {
        constructor(
          message: string,
          public field: string,
        ) {
          super(message);
        }
      }
      const error = new ValidationError('Invalid value', 'email');

      // act
      const result: Result<never, ValidationError> = failure(error);

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.field).toBe('email');
      }
    });

    it('given_string_error_when_failure_then_works', () => {
      // arrange & act
      const result: Result<never, string> = failure('error message');

      // assert
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('error message');
      }
    });
  });

  describe('type narrowing', () => {
    it('given_result_when_ok_checked_then_typescript_narrows_correctly', () => {
      // arrange
      const successResult: Result<string, Error> = success('value');
      const failureResult: Result<string, Error> = failure(new Error('error'));

      // act & assert - this tests TypeScript narrowing works at runtime
      if (successResult.ok) {
        expect(successResult.value).toBe('value');
        // @ts-expect-error - error should not exist on success
        expect(successResult.error).toBeUndefined();
      }

      if (!failureResult.ok) {
        expect(failureResult.error.message).toBe('error');
        // @ts-expect-error - value should not exist on failure
        expect(failureResult.value).toBeUndefined();
      }
    });
  });
});
