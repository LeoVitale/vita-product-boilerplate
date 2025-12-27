import { describe, it, expect } from 'vitest';
import {
  TaskSchema,
  CreateTaskInputSchema,
  UpdateTaskInputSchema,
} from './task';

describe('TaskSchema', () => {
  const validTask = {
    id: '123',
    title: 'Valid Task Title',
    description: 'A task description',
    completed: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z'),
  };

  it('given_valid_task_when_parse_then_succeeds', () => {
    // arrange & act
    const result = TaskSchema.safeParse(validTask);

    // assert
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe('123');
      expect(result.data.title).toBe('Valid Task Title');
      expect(result.data.description).toBe('A task description');
      expect(result.data.completed).toBe(true);
      expect(result.data.createdAt).toBeInstanceOf(Date);
      expect(result.data.updatedAt).toBeInstanceOf(Date);
    }
  });

  it('given_string_dates_when_parse_then_coerces_to_date', () => {
    // arrange
    const input = {
      ...validTask,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.createdAt).toBeInstanceOf(Date);
      expect(result.data.updatedAt).toBeInstanceOf(Date);
    }
  });

  it('given_null_description_when_parse_then_succeeds', () => {
    // arrange
    const input = { ...validTask, description: null };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.description).toBeNull();
    }
  });

  it('given_missing_description_when_parse_then_succeeds', () => {
    // arrange
    const { description: _, ...inputWithoutDescription } = validTask;

    // act
    const result = TaskSchema.safeParse(inputWithoutDescription);

    // assert
    expect(result.success).toBe(true);
  });

  it('given_title_less_than_3_chars_when_parse_then_fails', () => {
    // arrange
    const input = { ...validTask, title: 'ab' };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues[0];
      expect(issue).toBeDefined();
      expect(issue?.path).toContain('title');
    }
  });

  it('given_empty_title_when_parse_then_fails', () => {
    // arrange
    const input = { ...validTask, title: '' };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(false);
  });

  it('given_missing_id_when_parse_then_fails', () => {
    // arrange
    const { id: _, ...inputWithoutId } = validTask;

    // act
    const result = TaskSchema.safeParse(inputWithoutId);

    // assert
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues[0];
      expect(issue).toBeDefined();
      expect(issue?.path).toContain('id');
    }
  });

  it('given_missing_completed_when_parse_then_defaults_to_false', () => {
    // arrange
    const { completed: _, ...inputWithoutCompleted } = validTask;

    // act
    const result = TaskSchema.safeParse(inputWithoutCompleted);

    // assert
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.completed).toBe(false);
    }
  });

  it('given_invalid_id_type_when_parse_then_fails', () => {
    // arrange
    const input = { ...validTask, id: 123 };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(false);
  });

  it('given_invalid_completed_type_when_parse_then_fails', () => {
    // arrange
    const input = { ...validTask, completed: 'yes' };

    // act
    const result = TaskSchema.safeParse(input);

    // assert
    expect(result.success).toBe(false);
  });

  it('given_missing_createdAt_when_parse_then_fails', () => {
    // arrange
    const { createdAt: _, ...inputWithoutCreatedAt } = validTask;

    // act
    const result = TaskSchema.safeParse(inputWithoutCreatedAt);

    // assert
    expect(result.success).toBe(false);
  });

  it('given_missing_updatedAt_when_parse_then_fails', () => {
    // arrange
    const { updatedAt: _, ...inputWithoutUpdatedAt } = validTask;

    // act
    const result = TaskSchema.safeParse(inputWithoutUpdatedAt);

    // assert
    expect(result.success).toBe(false);
  });
});

describe('CreateTaskInputSchema', () => {
  it('given_valid_input_when_parse_then_succeeds', () => {
    // arrange
    const input = {
      title: 'New Task',
      description: 'Task description',
    };

    // act
    const result = CreateTaskInputSchema.safeParse(input);

    // assert
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe('New Task');
      expect(result.data.description).toBe('Task description');
    }
  });

  it('given_only_title_when_parse_then_succeeds', () => {
    // arrange
    const input = { title: 'New Task' };

    // act
    const result = CreateTaskInputSchema.safeParse(input);

    // assert
    expect(result.success).toBe(true);
  });

  it('given_title_less_than_3_chars_when_parse_then_fails', () => {
    // arrange
    const input = { title: 'ab' };

    // act
    const result = CreateTaskInputSchema.safeParse(input);

    // assert
    expect(result.success).toBe(false);
  });
});

describe('UpdateTaskInputSchema', () => {
  it('given_valid_input_when_parse_then_succeeds', () => {
    // arrange
    const input = {
      title: 'Updated Task',
      completed: true,
    };

    // act
    const result = UpdateTaskInputSchema.safeParse(input);

    // assert
    expect(result.success).toBe(true);
  });

  it('given_empty_object_when_parse_then_succeeds', () => {
    // arrange
    const input = {};

    // act
    const result = UpdateTaskInputSchema.safeParse(input);

    // assert
    expect(result.success).toBe(true);
  });

  it('given_only_completed_when_parse_then_succeeds', () => {
    // arrange
    const input = { completed: true };

    // act
    const result = UpdateTaskInputSchema.safeParse(input);

    // assert
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.completed).toBe(true);
    }
  });
});

