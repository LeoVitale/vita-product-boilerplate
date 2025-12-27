# Public API Pattern

The Public API pattern is a core concept from Feature-Sliced Design (FSD) that controls what each module exposes to the outside world.

## Concept

Each feature/module has an `index.ts` file that explicitly defines what is publicly accessible:

```typescript
// features/tasks/index.ts - This IS the public API
export { Task, TaskSchema } from './entities';
export { useGetTasks } from './hooks';
// Internal implementation details are NOT exported
```

## Benefits

1. **Encapsulation** - Internal implementation details stay hidden
2. **Refactoring Safety** - Change internals without breaking consumers
3. **Clear Contracts** - Explicit what's public vs private
4. **Better IDE Support** - Autocomplete shows only public exports

## Implementation

### Layer Structure

```
feature/
├── entities/
│   ├── task.ts           # Internal
│   └── index.ts          # Public API for entities
├── hooks/
│   ├── use-get-tasks.ts  # Internal
│   └── index.ts          # Public API for hooks
└── index.ts              # Feature Public API
```

### Example

```typescript
// features/tasks/entities/index.ts
export { Task, TaskSchema, CreateTaskInput } from './task';

// features/tasks/hooks/index.ts
export { useGetTasks, TasksQueryProvider } from './use-get-tasks';
export { useCreateTask, CreateTaskMutationProvider } from './use-create-task';

// features/tasks/index.ts (main public API)
export * from './entities';
export * from './hooks';
export * from './use-cases';
```

## Rules

1. **Always import from index.ts** - Never import directly from internal files
2. **Export only what's needed** - Don't export everything by default
3. **Types should be exported** - Use `export type { }` for type-only exports
4. **Document the public API** - Add JSDoc comments

## Common Mistakes

### ❌ Bad: Importing from internal paths

```typescript
import { Task } from '@repo/domain/features/tasks/entities/task';
```

### ✅ Good: Importing from public API

```typescript
import { Task } from '@repo/domain';
// or
import { Task } from '@repo/domain/features/tasks';
```

## References

- [FSD Public API](https://feature-sliced.design/docs/reference/public-api)
- [Barrel Files in TypeScript](https://basarat.gitbook.io/typescript/main-1/barrel)
