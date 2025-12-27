# Architecture Overview (EN)

## Purpose

Explain **what this boilerplate is optimizing for** and how the architecture is organized to maintain clean separation of concerns.

## When to use

- You want a production-grade reference for **Clean Architecture + SOLID** in a TypeScript monorepo.
- You want a thin UI shell while centralizing domain rules and use-cases in shared packages.
- You want a codebase that scales in complexity without turning into "hooks everywhere" spaghetti.

## What this repo is

- A **Turborepo + pnpm workspaces** monorepo.
- A **GraphQL** API (`apps/api`) consumed by Web (`apps/web`) and Mobile (`apps/mobile`).
- A shared, **feature-based** layered architecture in `packages/`:
  - `@repo/domain`: entities + contracts + Result type + domain errors
  - `@repo/application`: use cases + shared hooks that orchestrate use cases
  - `@repo/infrastructure`: concrete implementations (Apollo repositories, mappers)
  - `@repo/graphql`: generated GraphQL types/documents (codegen)
  - `@repo/ui`: shared UI primitives (web only)

Each package is organized by **features** (e.g., `tasks`, `auth`) with a `shared` folder for cross-cutting concerns. See [Feature-Based Architecture](./feature-based.en.md) for details.

## Core idea (in one sentence)

**Business rules live in shared packages; apps only render and wire dependencies (composition root).**

## Minimal mental model

```mermaid
graph LR
  Web["Apps / Web"] --> App["@repo/application"]
  Mobile["Apps / Mobile"] --> App
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
- **Feature-Sliced Design**: `https://feature-sliced.design/`
- **Turborepo**: `https://turborepo.com/docs`
