# AI Agent Instructions

This document provides high-level guidance for AI coding assistants working on this codebase.

## Project Overview

This is a **Clean Architecture monorepo** for building production-ready React applications with:

- **Next.js** (web) and **Expo** (mobile) frontends
- **Apollo Client** for GraphQL
- **Zod** for runtime validation
- **Result Pattern** for error handling
- **Dependency Injection** for testability

## Architecture Summary

```
packages/
├── domain/          # Pure business logic (Zod schemas, interfaces, contracts)
├── application/     # Use cases + React hooks + factories
├── infrastructure/  # Apollo implementations + mappers + Apollo hooks
├── graphql/         # Generated GraphQL documents
├── config/          # Shared configurations (ESLint, Prettier, TypeScript)
└── ui/              # Shared UI components

apps/
├── api/             # NestJS backend (Prisma + GraphQL)
├── web/             # Next.js app (Composition Root)
└── mobile/          # Expo app (Composition Root)
```

## Key Principles

1. **Dependency Inversion**: Inner layers (domain, application) never import from outer layers (infrastructure, apps)
2. **Result Pattern**: Never throw errors - return `Result<T, E>` instead
3. **Zod First**: All entities are defined as Zod schemas
4. **TDD Mandatory**: Write failing tests before implementation
5. **Co-location**: Tests live next to the code they test

## How to Add a Feature

1. **Domain**: Create entity (Zod) + repository interface + hook contracts
2. **Application**: Create use cases + hooks + factories
3. **Infrastructure**: Create mapper + Apollo repository + Apollo hooks
4. **GraphQL**: Add queries/mutations in `packages/graphql`
5. **API** (if backend changes needed): Update resolvers/services in `apps/api`
6. **App**: Wire up in Composition Root

See: `.cursor/rules/feature-generator.mdc` for detailed guide.

## File Naming

| Type                 | Pattern                          | Example                        |
| -------------------- | -------------------------------- | ------------------------------ |
| Entity               | `{name}.ts`                      | `task.ts`                      |
| Schema               | `{Name}Schema`                   | `TaskSchema`                   |
| Repository Interface | `{name}-repository.interface.ts` | `task-repository.interface.ts` |
| Use Case             | `{action}-{entity}.use-case.ts`  | `get-tasks.use-case.ts`        |
| Hook                 | `use-{entity}.ts`                | `use-tasks.ts`                 |
| Mapper               | `{entity}.mapper.ts`             | `task.mapper.ts`               |
| Apollo Repository    | `apollo-{entity}.repository.ts`  | `apollo-task.repository.ts`    |

## Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:web          # Start web only

# Testing
pnpm test             # Run all tests (Vitest for packages, Jest for API)

# Code Quality
pnpm lint             # Lint all packages
pnpm check-types      # TypeScript check

# GraphQL
pnpm generate         # Generate GraphQL types

# Docker (for API database)
pnpm docker:up        # Start database containers
pnpm docker:down      # Stop database containers
```

## Common Patterns

### Creating an Entity

```typescript
// packages/domain/src/features/users/entities/user.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2),
  createdAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;
```

### Creating a Use Case

```typescript
// packages/application/src/features/users/use-cases/get-user.use-case.ts
import {
  User,
  UserRepositoryInterface,
  Result,
  DomainError,
} from '@repo/domain';

export class GetUserUseCase {
  constructor(private readonly userRepo: UserRepositoryInterface) {}

  async execute(id: string): Promise<Result<User | null, DomainError>> {
    return this.userRepo.findById(id);
  }
}
```

### Result Pattern Usage

```typescript
const result = await useCase.execute(input);

if (result.ok) {
  // Success: result.value contains the data
  console.log(result.value);
} else {
  // Failure: result.error contains the error
  console.error(result.error.message);
}
```

## Documentation

- Architecture: `docs/architecture/`
- Patterns: `docs/patterns/`
- Workflows: `docs/workflows/`

All docs are bilingual (English `.en.md` and Portuguese `.pt.md`).

## What NOT to Do

- ❌ Import infrastructure in domain/application
- ❌ Throw errors instead of returning Result
- ❌ Skip tests for business logic
- ❌ Create `__tests__` folders (use co-location)
- ❌ Define GraphQL queries in app layer

## Cursor Rules

Detailed rules are in `.cursor/rules/`:

- `clean-arch-rules.mdc` - Architecture rules (always applied)
- `tdd-rules.mdc` - Testing requirements (always applied)
- `docs-rules.mdc` - Documentation requirements (always applied)
- `domain-entity.mdc` - Entity creation guide
- `repository-interface.mdc` - Repository contract guide
- `use-case.mdc` - Use case creation guide
- `apollo-repository.mdc` - Apollo implementation guide
- `application-hook.mdc` - Hook creation guide
- `feature-generator.mdc` - Complete feature guide
- `vitest-tests.mdc` - Test writing guide
