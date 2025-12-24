# Refactor to Apollo Client + Composition Root (with Testing Setup)

## Overview

Set up hybrid testing environment (Vitest + Jest), then migrate from custom hooks to Apollo Client native `useQuery` with cache, implement composition root to centralize dependency injection, and document all decisions following strict TDD.

## Testing Strategy

- **Vitest**: `packages/domain`, `packages/application`, `packages/infrastructure`, `apps/web`
- **Jest**: `apps/mobile` (React Native standard), `apps/api` (already configured)

---

## PHASE 1: Testing Environment Setup (Commits 1-6)

### Commit 1: chore(domain): setup Vitest testing environment

Add Vitest to domain package with basic Node config.

**Files:**

- `packages/domain/package.json`
- `packages/domain/vitest.config.ts` (create)

---

### Commit 2: chore(application): setup Vitest with React Testing Library

Add Vitest + React Testing Library to test React hooks.

**Files:**

- `packages/application/package.json`
- `packages/application/vitest.config.ts` (create)

---

### Commit 3: chore(infrastructure): setup Vitest with Apollo mocks

Add Vitest to test Apollo repositories.

**Files:**

- `packages/infrastructure/package.json`
- `packages/infrastructure/vitest.config.ts` (create)

---

### Commit 4: chore(web): setup Vitest for Next.js

Add Vitest to Next.js app.

**Files:**

- `apps/web/package.json`
- `apps/web/vitest.config.ts` (create)

---

### Commit 5: chore(turbo): add test task to pipeline

Add `test` task to Turborepo pipeline.

**Files:**

- `turbo.json`

---

### Commit 6: docs: add testing setup documentation (PT/EN)

Document hybrid strategy and how to run tests.

**Files:**

- `docs/testing/setup.pt.md` (create)
- `docs/testing/setup.en.md` (create)

---

## PHASE 2: Refactoring with TDD (Commits 7-19)

### Commit 7: feat(config): add centralized API configuration

Centralize API URLs in a single location.

**Files:**

- `packages/config/src/env.ts` (create)
- `packages/config/src/index.ts`

---

### Commit 8: test(application): add factory tests for use-cases

TDD RED: write tests for factory before implementation.

**Files:**

- `packages/application/src/factories/use-cases.factory.test.ts` (create)

---

### Commit 9: feat(application): create use-cases factory

TDD GREEN: implement factory to pass tests.

**Files:**

- `packages/application/src/factories/use-cases.factory.ts` (create)
- `packages/application/src/index.ts`

---

### Commit 10: test(application): add useGetTasks Apollo hook tests

TDD RED: write tests for hook with Apollo useQuery.

**Files:**

- `packages/application/src/hooks/use-get-tasks.test.tsx` (create)

---

### Commit 11: refactor(application): migrate useGetTasks to Apollo useQuery

TDD GREEN: refactor hook to use Apollo useQuery natively.

**BREAKING CHANGE**: hook no longer receives `useCase` parameter.

**Files:**

- `packages/application/src/hooks/use-get-tasks.ts`

---

### Commit 12: test(web): add UseCasesProvider tests

TDD RED: tests for Web composition root.

**Files:**

- `apps/web/src/providers/UseCasesProvider.test.tsx` (create)

---

### Commit 13: feat(web): create UseCasesProvider composition root

TDD GREEN: implement provider.

**Files:**

- `apps/web/src/providers/UseCasesProvider.tsx` (create)
- `apps/web/src/providers/index.ts` (create)

---

### Commit 14: refactor(web): use centralized API config in apollo-client

Use centralized config in Apollo Client.

**Files:**

- `apps/web/src/infrastructure/graphql/apollo-client.ts`

---

### Commit 15: refactor(web): integrate UseCasesProvider in app layout

Integrate provider in layout and simplify page.

**Files:**

- `apps/web/app/providers.tsx`
- `apps/web/app/page.tsx`

---

### Commit 16: test(mobile): add UseCasesProvider tests

TDD RED: tests for Mobile composition root (using Jest).

**Files:**

- `apps/mobile/src/providers/UseCasesProvider.test.tsx` (create)

---

### Commit 17: feat(mobile): create UseCasesProvider composition root

TDD GREEN: implement Mobile provider.

**Files:**

- `apps/mobile/src/providers/UseCasesProvider.tsx` (create)
- `apps/mobile/src/providers/index.ts`

---

### Commit 18: refactor(mobile): use centralized API config in ApolloProvider

Use centralized config in Mobile Apollo Provider.

**Files:**

- `apps/mobile/src/providers/ApolloProvider.tsx`

---

### Commit 19: refactor(mobile): integrate UseCasesProvider in App

Integrate provider in App and simplify TasksScreen.

**Files:**

- `apps/mobile/src/App.tsx`
- `apps/mobile/src/screens/TasksScreen.tsx`

---

## PHASE 3: Documentation (Commits 20-26)

### Commit 20: docs: add Apollo Client architecture documentation (PT)

Document Apollo decision, cache, policies.

**Files:**

- `docs/architecture/apollo-client.pt.md` (create)

---

### Commit 21: docs: add Apollo Client architecture documentation (EN)

English translation.

**Files:**

- `docs/architecture/apollo-client.en.md` (create)

---

### Commit 22: docs: add Composition Root pattern documentation (PT)

Document composition root pattern.

**Files:**

- `docs/patterns/composition-root.pt.md` (create)

---

### Commit 23: docs: add Composition Root pattern documentation (EN)

English translation.

**Files:**

- `docs/patterns/composition-root.en.md` (create)

---

### Commit 24: docs: update adding-a-feature workflow (PT)

Update workflow with new flow.

**Files:**

- `docs/workflows/adding-a-feature.pt.md`

---

### Commit 25: docs: update adding-a-feature workflow (EN)

Update English workflow.

**Files:**

- `docs/workflows/adding-a-feature.en.md`

---

### Commit 26: chore: update README with Apollo + Composition Root

Update README with new patterns.

**Files:**

- `README.md`

---

## Final Summary

**Total: 26 structured commits**

- Phase 1 (Setup): 6 commits
- Phase 2 (TDD Refactoring): 13 commits
- Phase 3 (Docs): 7 commits

**New files**: 23
**Modified files**: 10

**Breaking Changes:**

- `useGetTasks()` no longer receives parameter
- Components need `<UseCasesProvider>`
