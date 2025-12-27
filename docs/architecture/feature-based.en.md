# Feature-Based Architecture

This project uses a **Feature-Based Architecture** that combines:

- **Clean Architecture** - Dependency rule, use cases, result pattern
- **Feature-Sliced Design (FSD)** - Feature isolation, public API, layers

## Structure

```
packages/
├── domain/src/
│   ├── features/
│   │   └── tasks/           # Task feature domain
│   │       ├── entities/
│   │       ├── repositories/
│   │       ├── contracts/
│   │       └── index.ts     # Public API
│   └── shared/
│       ├── core/            # Result pattern
│       └── errors/          # Domain errors
│
├── application/src/
│   ├── features/
│   │   └── tasks/           # Task feature application
│   │       ├── use-cases/
│   │       ├── hooks/
│   │       ├── factories/
│   │       └── index.ts     # Public API
│   └── shared/
│       └── hooks/           # Cross-feature hooks
│
└── infrastructure/src/
    ├── features/
    │   └── tasks/           # Task feature infrastructure
    │       ├── repositories/
    │       ├── mappers/
    │       ├── hooks/
    │       └── index.ts     # Public API
    └── shared/
        └── graphql/         # Apollo config
```

## Principles

### 1. Feature Isolation (FSD)

Each feature is self-contained with its own entities, use cases, and infrastructure.

```typescript
// Good: Import from feature public API
import { Task, useGetTasks } from '@repo/application';

// Also good: Import directly from feature
import { Task } from '@repo/domain/features/tasks';
```

### 2. Public API Pattern (FSD)

Each feature exposes a controlled public API via `index.ts`:

```typescript
// features/tasks/index.ts
export { Task, TaskSchema } from './entities';
export { TaskRepositoryInterface } from './repositories';
export { useGetTasks, useCreateTask } from './hooks';
```

### 3. Dependency Rule (Clean Architecture)

Dependencies point inward:

```
Apps → Application → Domain
  ↓         ↓
Infrastructure
```

- **Domain**: No external dependencies
- **Application**: Depends only on Domain
- **Infrastructure**: Implements Domain interfaces
- **Apps**: Wires everything together (Composition Root)

### 4. Shared Modules

Cross-cutting concerns live in `shared/`:

- `domain/shared/core` - Result pattern
- `domain/shared/errors` - Domain errors
- `application/shared/hooks` - Shared hooks
- `infrastructure/shared/graphql` - Apollo config

## Adding a New Feature

1. **Create domain layer** (`packages/domain/src/features/{feature}/`)
   - Entities with Zod schemas
   - Repository interfaces
   - Contracts for hooks

2. **Create application layer** (`packages/application/src/features/{feature}/`)
   - Use cases
   - Hooks with DI
   - Factory functions

3. **Create infrastructure layer** (`packages/infrastructure/src/features/{feature}/`)
   - Repository implementations
   - Mappers
   - Apollo hooks

4. **Wire up in Composition Root** (`apps/web/src/providers/`)
   - Create repository instance
   - Create use cases
   - Provide hooks

See [Adding a Feature Workflow](../workflows/adding-a-feature.en.md) for details.

## Benefits

1. **Horizontal Scalability** - Add auth, subscriptions, payments without pollution
2. **Feature Ownership** - Teams can own specific features
3. **Explicit Public API** - Controlled exports via index.ts
4. **Easier Onboarding** - Self-explanatory structure
5. **Less Coupling** - Features isolated with clear contracts
6. **Monorepo Ready** - Easy to extract features to separate packages

## References

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
