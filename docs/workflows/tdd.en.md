# TDD Workflow (Vitest) (EN)

## Purpose

Make changes safely by practicing **Test-Driven Development**: Red → Green → Refactor.

## Scope in this repo

For this boilerplate, TDD is required for **all new feature code**:

- `@repo/domain`
- `@repo/application`
- `@repo/infrastructure`

Docs-only changes are excluded.

## Red → Green → Refactor

1. **Red**: write a failing test that describes the desired behavior.
2. **Green**: implement the smallest change to make the test pass.
3. **Refactor**: improve design while keeping tests green.

## What to test (by layer)

### Domain

- entity invariants (Zod schemas)
- pure functions / utilities

### Application

- use case behavior using **fake repositories**
- Result success/failure paths

### Infrastructure

- mapping at boundaries (external data → domain entity)
- contract tests for repository implementations (optional later)

## Minimal test style (example)

```ts
// Given
// - a fake repository returning known tasks
// When
// - GetTasksUseCase.execute() is called
// Then
// - it returns ok: true with expected tasks
```

## Conventions (recommended)

- Prefer unit tests for domain + use cases.
- Keep tests deterministic (no network, no time, no randomness).
- Name tests by behavior (Given/When/Then).

## Links

- TDD (Martin Fowler): `https://martinfowler.com/bliki/TestDrivenDevelopment.html`
- Agile Alliance glossary: `https://www.agilealliance.org/glossary/tdd/`
- Vitest: `https://vitest.dev/`
