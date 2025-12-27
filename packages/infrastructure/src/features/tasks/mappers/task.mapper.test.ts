import { describe, it, expect } from 'vitest';
import { TaskMapper } from './task.mapper';

describe('TaskMapper', () => {
  const validRawTask = {
    id: '1',
    title: 'Test Task',
    description: 'A description',
    completed: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  };

  describe('toDomain', () => {
    it('given_valid_raw_data_when_mapping_then_returns_task', () => {
      // act
      const task = TaskMapper.toDomain(validRawTask);

      // assert
      expect(task.id).toBe('1');
      expect(task.title).toBe('Test Task');
      expect(task.description).toBe('A description');
      expect(task.completed).toBe(false);
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
    });

    it('given_invalid_raw_data_when_mapping_then_throws_error', () => {
      // arrange
      const invalidRaw = { id: '1', title: 'ab' }; // title too short

      // act & assert
      expect(() => TaskMapper.toDomain(invalidRaw)).toThrow();
    });
  });

  describe('toDomainList', () => {
    it('given_valid_raw_array_when_mapping_then_returns_task_array', () => {
      // arrange
      const rawList = [
        validRawTask,
        { ...validRawTask, id: '2', title: 'Second Task' },
      ];

      // act
      const tasks = TaskMapper.toDomainList(rawList);

      // assert
      expect(tasks).toHaveLength(2);
      expect(tasks[0]?.id).toBe('1');
      expect(tasks[1]?.id).toBe('2');
    });

    it('given_array_with_invalid_item_when_mapping_then_throws_error', () => {
      // arrange
      const rawList = [validRawTask, { id: '2', title: 'ab' }];

      // act & assert
      expect(() => TaskMapper.toDomainList(rawList)).toThrow();
    });
  });

  describe('toDomainSafe', () => {
    it('given_valid_raw_data_when_mapping_then_returns_task', () => {
      // act
      const task = TaskMapper.toDomainSafe(validRawTask);

      // assert
      expect(task).not.toBeNull();
      expect(task?.id).toBe('1');
    });

    it('given_invalid_raw_data_when_mapping_then_returns_null', () => {
      // arrange
      const invalidRaw = { id: '1', title: 'ab' };

      // act
      const task = TaskMapper.toDomainSafe(invalidRaw);

      // assert
      expect(task).toBeNull();
    });
  });

  describe('toDomainListSafe', () => {
    it('given_mixed_array_when_mapping_then_returns_only_valid_tasks', () => {
      // arrange
      const rawList = [
        validRawTask,
        { id: '2', title: 'ab' }, // invalid
        { ...validRawTask, id: '3', title: 'Third Task' },
      ];

      // act
      const tasks = TaskMapper.toDomainListSafe(rawList);

      // assert
      expect(tasks).toHaveLength(2);
      expect(tasks[0]?.id).toBe('1');
      expect(tasks[1]?.id).toBe('3');
    });

    it('given_all_invalid_items_when_mapping_then_returns_empty_array', () => {
      // arrange
      const rawList = [
        { id: '1', title: 'ab' },
        { id: '2', title: 'cd' },
      ];

      // act
      const tasks = TaskMapper.toDomainListSafe(rawList);

      // assert
      expect(tasks).toHaveLength(0);
    });
  });
});
