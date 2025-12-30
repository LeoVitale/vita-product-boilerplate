# Vita Product Boilerplate Constitution

This constitution defines the unchanging principles that govern all development in this project. Every feature, refactoring, or architectural decision must comply with these rules.

## Core Principles

### I. Clean Architecture (NON-NEGOTIABLE)

Strict layer separation is enforced at all times:

- **Domain**: Pure business logic — Zod schemas, entity types, repository interfaces, hook contracts
- **Application**: Orchestration — Use cases, React hooks, factories
- **Infrastructure**: External world — Apollo implementations, mappers, Apollo hooks
- **Apps**: Composition only — Composition Root wiring, UI components

**Rule**: Inner layers (Domain, Application) NEVER import from outer layers (Infrastructure, Apps). This is the **Dependency Inversion Principle**.

**Violation examples**:

- ❌ Importing Apollo Client in a use case
- ❌ Using infrastructure hooks directly in application layer
- ❌ Defining GraphQL queries in app components

### II. Result Pattern (NON-NEGOTIABLE)

Never throw errors in business logic. All operations that can fail must return `Result<T, E>`:

```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
```

**Applies to**:

- All use case methods
- All repository methods
- All async operations that can fail

**Violation examples**:

- ❌ `throw new Error('User not found')`
- ❌ Letting exceptions propagate from use cases
- ❌ Not handling both success and failure paths

### III. Test-Driven Development (NON-NEGOTIABLE)

TDD is mandatory for all feature code. The Red-Green-Refactor cycle must be followed:

1. **Red**: Write a failing test that describes desired behavior
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve code quality while keeping tests green

**Rules**:

- Tests MUST be co-located with code (`feature.ts` + `feature.test.ts` in same folder)
- No `__tests__` folders — tests live next to implementation
- Vitest for packages (`@repo/*`), Jest for API (`apps/api`)
- Tests must be deterministic (no real network, time, or randomness)

### IV. Apollo Client First

All GraphQL data fetching uses Apollo Client. React Query is NOT used in this project.

**Architecture**:

- Hook contracts defined in `@repo/domain` (interfaces)
- Application hooks in `@repo/application` (orchestration via Context)
- Apollo implementations in `@repo/infrastructure` (actual Apollo hooks)
- Composition Root wires infrastructure to application

**Violation examples**:

- ❌ Using React Query anywhere
- ❌ Calling Apollo hooks directly in components
- ❌ Defining GraphQL operations in app layer

### V. Zod First

All domain entities are defined as Zod schemas with inferred types:

```typescript
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2),
});

export type User = z.infer<typeof UserSchema>;
```

**Benefits**:

- Runtime validation at boundaries
- Type safety from schema
- Single source of truth

**Rules**:

- Parse external data at infrastructure boundaries (mappers)
- Never trust data from GraphQL/API without validation
- Schema changes require migration consideration

## Technology Constraints

| Concern            | Technology      | Notes               |
| ------------------ | --------------- | ------------------- |
| Frontend (Web)     | Next.js         | App Router          |
| Frontend (Mobile)  | Expo            | React Native        |
| Data Fetching      | Apollo Client   | NOT React Query     |
| Backend            | NestJS          | GraphQL-first       |
| Database           | Prisma          | PostgreSQL          |
| Validation         | Zod             | All entities        |
| Testing (packages) | Vitest          | Fast, ESM-native    |
| Testing (API)      | Jest            | NestJS default      |
| Monorepo           | pnpm workspaces | Turborepo for tasks |

## Development Workflow

Every feature follows this order (inside-out):

1. **Domain**: Create entities (Zod schemas) + repository interfaces + hook contracts
2. **Tests**: Write failing tests for use cases
3. **Application**: Implement use cases + application hooks
4. **Infrastructure**: Create mappers + Apollo repositories + Apollo hooks
5. **Apps**: Wire Composition Root + create UI components

**Never** start from the outside (UI) and work inward. Always build from Domain first.

## Non-Functional Requirements

### Documentation

- All new features must have bilingual documentation (English + Portuguese)
- Docs follow didactic structure: Purpose, When to use, Example, Common mistakes, Links
- Located in `docs/` folder with `.en.md` and `.pt.md` suffixes

### Educational Purpose

This boilerplate is educational. Code should:

- Teach Clean Architecture patterns
- Be readable and well-commented
- Include clear examples
- Avoid over-optimization at cost of clarity

### Production Readiness

Despite being educational, code must be production-quality:

- Proper error handling
- Type safety throughout
- No `any` types without justification
- Comprehensive test coverage for business logic

## Governance

### Supremacy

This constitution supersedes all other practices, conventions, or preferences. If a decision conflicts with these principles, the constitution wins.

### Amendments

Changes to this constitution require:

1. Documented justification
2. Team approval
3. Migration plan for existing code
4. Version increment

### Enforcement

- All AI-assisted development must verify compliance with these principles
- Code reviews must check constitution compliance
- Architectural decisions must reference relevant principles

### Cursor Rules Integration

This constitution complements the rules in `.cursor/rules/`. The relationship:

- **Constitution**: High-level principles ("what" and "why")
- **Cursor Rules**: Technical implementation details ("how")

Both are authoritative. Constitution provides principles; Cursor Rules provide patterns.

---

**Version**: 1.0.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2025-12-30
