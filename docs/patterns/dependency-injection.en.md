# Dependency Injection (EN)

## Purpose

Keep core logic testable and decoupled by **injecting dependencies** (repositories) instead of importing concrete implementations.

## When to use

- Always for use cases and repositories.
- Whenever a module needs an adapter (API client, storage, clock, UUID, etc.).

## The rule of thumb

- **Domain** defines interfaces.
- **Infrastructure** implements them.
- **Apps** wire everything (composition root).

## Minimal example

```ts
// Application
export class GetTasksUseCase {
  constructor(private repo: TaskRepositoryInterface) {}
}

// Apps (composition root)
const repo = new ApolloTaskRepository(apolloClient);
const useCase = new GetTasksUseCase(repo);
```

## Why this matters

- Use cases can be unit-tested with a fake repo.
- Infrastructure can be swapped (Apollo → REST) without touching domain/application.

## Common mistakes

- `new ApolloTaskRepository()` inside a use case.
- Using global singletons everywhere instead of injecting.
- Letting infrastructure import application code (wrong direction).

## Links

- [Composition Root](./composition-root.en.md)
- [Feature-Based Architecture](../architecture/feature-based.en.md)
- Mark Seemann - Composition Root: `https://blog.ploeh.dk/2011/07/28/CompositionRoot/`
