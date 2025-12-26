import { describe, it, expect } from 'vitest';
import { TaskSchema } from './task';

describe('TaskSchema', () => {
  it('given_valid_task_when_parse_then_succeeds', () => {
    // arrange
    const input = {
      id: '123',
      title: 'Valid Task Title',
      completed: true,
    };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(input);
    }
  });

  it('given_title_less_than_3_chars_when_parse_then_fails', () => {
    // arrange
    const input = {
      id: '123',
      title: 'ab',
      completed: false,
    };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('title');
    }
  });

  it('given_empty_title_when_parse_then_fails', () => {
    // arrange
    const input = {
      id: '123',
      title: '',
      completed: false,
    };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(false);
  });

  it('given_missing_id_when_parse_then_fails', () => {
    // arrange
    const input = {
      title: 'Valid Title',
      completed: false,
    };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('id');
    }
  });

  it('given_missing_completed_when_parse_then_defaults_to_false', () => {
    // arrange
    const input = {
      id: '123',
      title: 'Valid Title',
    };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.completed).toBe(false);
    }
  });

  it('given_invalid_id_type_when_parse_then_fails', () => {
    // arrange
    const input = {
      id: 123, // should be string
      title: 'Valid Title',
      completed: false,
    };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(false);
  });

  it('given_invalid_completed_type_when_parse_then_fails', () => {
    // arrange
    const input = {
      id: '123',
      title: 'Valid Title',
      completed: 'yes', // should be boolean
    };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(false);
  });
});

