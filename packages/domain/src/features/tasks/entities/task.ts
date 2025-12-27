import { z } from 'zod';

/**
 * Task Entity Schema
 *
 * Represents a task in the domain layer with full validation.
 * All external data must be validated through this schema before
 * being used in the application.
 */
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  description: z.string().nullable().optional(),
  completed: z.boolean().default(false),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Task = z.infer<typeof TaskSchema>;

/**
 * Input schema for creating a new task
 */
export const CreateTaskInputSchema = z.object({
  title: z.string().min(3),
  description: z.string().nullable().optional(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;

/**
 * Input schema for updating a task
 */
export const UpdateTaskInputSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().nullable().optional(),
  completed: z.boolean().optional(),
});

export type UpdateTaskInput = z.infer<typeof UpdateTaskInputSchema>;

