# Testing Setup - Hybrid Strategy

## Purpose

This project uses a **hybrid testing strategy**, combining **Vitest** and **Jest** according to each ecosystem's best practices.

## Strategy by Layer

### Vitest

Used in shared packages and web app:

- `packages/domain` - Entity and Zod validation tests
- `packages/application` - Use case and React hooks tests
- `packages/infrastructure` - Repository and adapter tests
- `apps/web` - Next.js component tests

**Why?** Vitest is fast, modern, and integrates well with TypeScript and React in non-native environments.

### Jest

Used in mobile and API apps:

- `apps/mobile` - React Native tests (Expo ecosystem standard)
- `apps/api` - NestJS tests (already configured)

**Why?** Jest is the established standard for React Native and NestJS, with better support for native modules.

## How to Run Tests

### Run all tests (monorepo)

```bash
pnpm test
```

### Run tests for a specific package

```bash
# Domain
pnpm --filter @repo/domain test

# Application
pnpm --filter @repo/application test

# Infrastructure
pnpm --filter @repo/infrastructure test

# Web
pnpm --filter web test
```

### Run with UI (Vitest)

```bash
pnpm --filter @repo/application test:ui
```

### Run with coverage

```bash
pnpm --filter @repo/domain test:coverage
```

## Conventions

### File Naming

- **Co-location**: tests should be placed next to the tested file
- Pattern: `file.test.ts` or `file.test.tsx`
- Example:
  ```
  use-get-tasks.ts
  use-get-tasks.test.tsx
  ```

### Test Naming

Use **Given / When / Then** format for clarity:

```typescript
test('given_valid_task_when_validate_then_passes', () => {
  // arrange
  const task = { id: '1', title: 'Test', completed: false };

  // act
  const result = TaskSchema.safeParse(task);

  // assert
  expect(result.success).toBe(true);
});
```

## Configuration per Package

Each package/app has its own `vitest.config.ts` or `jest.config.js`:

- **Domain/Infrastructure**: `environment: 'node'`
- **Application/Web**: `environment: 'jsdom'` (for React hooks/components)
- **Mobile/API**: Jest (specific configuration)

## When to Write Tests

**TDD is mandatory** for:

- Business logic (domain, use cases)
- Repositories (infrastructure)
- Custom hooks (application)

See: [TDD Rules](./../workflows/tdd.en.md)

## Links

- Vitest: https://vitest.dev/
- Jest: https://jestjs.io/
- Testing Library: https://testing-library.com/
- React Native Testing Library: https://callstack.github.io/react-native-testing-library/
