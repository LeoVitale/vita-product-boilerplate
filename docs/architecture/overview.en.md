# Architecture Overview (EN)

## Purpose

Explain **what this boilerplate is optimizing for** and how the architecture is organized to maintain clean separation of concerns.

## When to use

- You want a production-grade reference for **Clean Architecture + SOLID** in a TypeScript monorepo.
- You want a thin UI shell while centralizing domain rules and use-cases in shared packages.
- You want a codebase that scales in complexity without turning into "hooks everywhere" spaghetti.

## What this repo is

- A **Turborepo + pnpm workspaces** monorepo.
- A **GraphQL** API (`apps/api`) consumed by Web (`apps/web`).
- A shared, layered architecture in `packages/`:
  - `@repo/domain`: entities + contracts + Result type
  - `@repo/application`: use cases + shared hooks that orchestrate use cases
  - `@repo/infrastructure`: concrete implementations (Apollo repositories, mappers)
  - `@repo/graphql`: generated GraphQL types/documents (codegen)
  - `@repo/ui`: shared UI primitives

## Core idea (in one sentence)

**Business rules live in shared packages; apps only render and wire dependencies (composition root).**

## Minimal mental model

```mermaid
graph LR
  Web["Apps / Web (UI)"] --> App["@repo/application"]
  App --> Domain["@repo/domain"]
  Infra["@repo/infrastructure"] --> Domain
  App --> Infra
```

## Common mistakes

- Putting business rules in React components or hooks inside `apps/*`.
- Importing Apollo/GraphQL types directly into `@repo/domain`.
- Skipping dependency injection and instantiating repositories inside use cases.

## Links

- **Clean Architecture**: `https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html`
- **SOLID**: `https://en.wikipedia.org/wiki/SOLID`
- **Turborepo**: `https://turborepo.com/docs`
