# Adding a Feature (EN)

## Purpose

Provide a repeatable workflow to add features **professionally and safely** under Feature-Based Clean Architecture.

## When to use

Use this checklist any time you add a new business capability (new entity, new use case, new integration).

## Quick Start

Use the feature generator script:

```bash
./scripts/generate-feature.sh auth
# Creates packages/{domain,application,infrastructure}/src/features/auth/
```

## The golden rule

Build from the inside out:

1. Domain (entities + contracts)
2. Application (use cases + hooks orchestration)
3. Infrastructure (implementations + mappers)
4. Apps (composition root + UI)

## Step-by-step

### 1) Generate feature structure

```bash
./scripts/generate-feature.sh <feature-name>
```

This creates:

- `packages/domain/src/features/<feature>/`
- `packages/application/src/features/<feature>/`
- `packages/infrastructure/src/features/<feature>/`

### 2) Domain: entity + invariants (Zod)

Location: `packages/domain/src/features/<feature>/entities/`

- Define a schema and type using `z.infer`.
- Keep entities domain-shaped, not API-shaped.

```typescript
// packages/domain/src/features/auth/entities/user.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2),
  createdAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;
```

### 3) Domain: repository interface(s)

Location: `packages/domain/src/features/<feature>/repositories/`

- Define the minimal contract your use case needs.
- Return `Result` from methods.

```typescript
// packages/domain/src/features/auth/repositories/auth-repository.interface.ts
import { Result } from '../../../shared/core/result';
import { User } from '../entities/user';
import { DomainError } from '../../../shared/errors/domain-errors';

export interface AuthRepositoryInterface {
  getCurrentUser(): Promise<Result<User | null, DomainError>>;
  login(email: string, password: string): Promise<Result<User, DomainError>>;
  logout(): Promise<Result<void, DomainError>>;
}
```

### 4) Domain: update public API

Location: `packages/domain/src/features/<feature>/index.ts`

```typescript
export * from './entities';
export type { AuthRepositoryInterface } from './repositories';
```

### 5) Application: use case (pure)

Location: `packages/application/src/features/<feature>/use-cases/`

- Inject repository interfaces via constructor.
- Return `Result` to the caller.
- Do not import Apollo/GraphQL.

```typescript
// packages/application/src/features/auth/use-cases/login.use-case.ts
import {
  AuthRepositoryInterface,
  User,
  Result,
  DomainError,
} from '@repo/domain';

export interface ILoginUseCase {
  execute(email: string, password: string): Promise<Result<User, DomainError>>;
}

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly authRepo: AuthRepositoryInterface) {}

  async execute(
    email: string,
    password: string,
  ): Promise<Result<User, DomainError>> {
    return this.authRepo.login(email, password);
  }
}
```

### 6) Application: factory for the use case

Location: `packages/application/src/features/<feature>/factories/`

```typescript
// packages/application/src/features/auth/factories/use-cases.factory.ts
import { AuthRepositoryInterface } from '@repo/domain';
import { LoginUseCase } from '../use-cases/login.use-case';

export function createAuthUseCases(repository: AuthRepositoryInterface) {
  return {
    loginUseCase: new LoginUseCase(repository),
  };
}
```

### 7) Application: hooks with DI

Location: `packages/application/src/features/<feature>/hooks/`

```typescript
// packages/application/src/features/auth/hooks/use-login.ts
import { createContext, useContext } from 'react';
import { LoginMutationInterface } from '@repo/domain';

const LoginMutationContext = createContext<LoginMutationInterface | null>(null);

export const LoginMutationProvider = LoginMutationContext.Provider;

export function useLogin() {
  const loginMutation = useContext(LoginMutationContext);
  if (!loginMutation) {
    throw new Error('useLogin must be used within LoginMutationProvider');
  }
  return loginMutation();
}
```

### 8) Infrastructure: repository implementation

Location: `packages/infrastructure/src/features/<feature>/repositories/`

- Call Apollo/HTTP/storage.
- Map external data into domain entities using Zod schemas.

### 9) Apps: composition root (provider)

Location: `apps/web/src/providers/UseCasesProvider.tsx`

```typescript
// Add to UseCasesProvider.tsx
import { ApolloAuthRepository, useApolloLogin } from '@repo/infrastructure';
import { createAuthUseCases, LoginMutationProvider } from '@repo/application';

// In useMemo:
const authRepository = new ApolloAuthRepository(client as GraphQLClient);
const authUseCases = createAuthUseCases(authRepository);

// In JSX:
<LoginMutationProvider value={useApolloLogin}>
  {children}
</LoginMutationProvider>
```

### 10) UI: render

- Components/screens render based on hook output.
- Hooks come from `@repo/application` (don't create locally).
- Keep UI logic in UI; keep business rules in use cases.

## Done criteria

- All new feature code follows dependency direction.
- Mapping/validation happens at boundaries (infrastructure).
- No new business logic in `apps/*` components.
- Public API exports are updated in all layers.

## Links

- [Feature-Based Architecture](../architecture/feature-based.en.md)
- [Public API Pattern](../patterns/public-api.en.md)
- Clean Architecture: `https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html`
- Feature-Sliced Design: `https://feature-sliced.design/`
