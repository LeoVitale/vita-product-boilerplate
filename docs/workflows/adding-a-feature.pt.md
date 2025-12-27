# Adicionando uma Feature (PT)

## Propósito

Fornecer um workflow repetível para adicionar features **profissionalmente e com segurança** sob Feature-Based Clean Architecture.

## Quando usar

Use este checklist sempre que adicionar uma nova capacidade de negócio (nova entidade, novo use case, nova integração).

## Quick Start

Use o script gerador de features:

```bash
./scripts/generate-feature.sh auth
# Cria packages/{domain,application,infrastructure}/src/features/auth/
```

## A regra de ouro

Construa de dentro para fora:

1. Domain (entidades + contratos)
2. Application (use cases + orquestração de hooks)
3. Infrastructure (implementações + mappers)
4. Apps (composition root + UI)

## Passo a passo

### 1) Gerar estrutura da feature

```bash
./scripts/generate-feature.sh <nome-da-feature>
```

Isso cria:

- `packages/domain/src/features/<feature>/`
- `packages/application/src/features/<feature>/`
- `packages/infrastructure/src/features/<feature>/`

### 2) Domain: entidade + invariantes (Zod)

Local: `packages/domain/src/features/<feature>/entities/`

- Defina schema e tipo usando `z.infer`.
- Mantenha entidades no formato do domínio, não da API.

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

### 3) Domain: interface(s) de repositório

Local: `packages/domain/src/features/<feature>/repositories/`

- Defina o contrato mínimo que seu use case precisa.
- Retorne `Result` dos métodos.

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

### 4) Domain: atualizar API pública

Local: `packages/domain/src/features/<feature>/index.ts`

```typescript
export * from './entities';
export type { AuthRepositoryInterface } from './repositories';
```

### 5) Application: use case (puro)

Local: `packages/application/src/features/<feature>/use-cases/`

- Injete interfaces de repositório via construtor.
- Retorne `Result` para o chamador.
- Não importe Apollo/GraphQL.

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

### 6) Application: factory para o use case

Local: `packages/application/src/features/<feature>/factories/`

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

### 7) Application: hooks com DI

Local: `packages/application/src/features/<feature>/hooks/`

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

### 8) Infrastructure: implementação do repositório

Local: `packages/infrastructure/src/features/<feature>/repositories/`

- Chame Apollo/HTTP/storage.
- Mapeie dados externos para entidades de domínio usando schemas Zod.

### 9) Apps: composition root (provider)

Local: `apps/web/src/providers/UseCasesProvider.tsx`

```typescript
// Adicione ao UseCasesProvider.tsx
import { ApolloAuthRepository, useApolloLogin } from '@repo/infrastructure';
import { createAuthUseCases, LoginMutationProvider } from '@repo/application';

// No useMemo:
const authRepository = new ApolloAuthRepository(client as GraphQLClient);
const authUseCases = createAuthUseCases(authRepository);

// No JSX:
<LoginMutationProvider value={useApolloLogin}>
  {children}
</LoginMutationProvider>
```

### 10) UI: renderização

- Componentes/telas renderizam baseado no output do hook.
- Hooks vêm de `@repo/application` (não crie localmente).
- Mantenha lógica de UI na UI; mantenha regras de negócio nos use cases.

## Critérios de conclusão

- Todo código da nova feature segue a direção de dependência.
- Mapeamento/validação acontece nas fronteiras (infrastructure).
- Sem nova lógica de negócio em componentes `apps/*`.
- Exports da API pública atualizados em todas as camadas.

## Links

- [Arquitetura Feature-Based](../architecture/feature-based.pt.md)
- [Padrão de API Pública](../patterns/public-api.pt.md)
- Clean Architecture: `https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html`
- Feature-Sliced Design: `https://feature-sliced.design/`
