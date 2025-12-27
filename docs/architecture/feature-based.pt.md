# Arquitetura Feature-Based

Este projeto usa uma **Arquitetura Feature-Based** que combina:

- **Clean Architecture** - Regra de dependência, use cases, result pattern
- **Feature-Sliced Design (FSD)** - Isolamento de features, API pública, camadas

## Estrutura

```
packages/
├── domain/src/
│   ├── features/
│   │   └── tasks/           # Feature Task - domínio
│   │       ├── entities/
│   │       ├── repositories/
│   │       ├── contracts/
│   │       └── index.ts     # API Pública
│   └── shared/
│       ├── core/            # Result pattern
│       └── errors/          # Erros de domínio
│
├── application/src/
│   ├── features/
│   │   └── tasks/           # Feature Task - aplicação
│   │       ├── use-cases/
│   │       ├── hooks/
│   │       ├── factories/
│   │       └── index.ts     # API Pública
│   └── shared/
│       └── hooks/           # Hooks cross-feature
│
└── infrastructure/src/
    ├── features/
    │   └── tasks/           # Feature Task - infraestrutura
    │       ├── repositories/
    │       ├── mappers/
    │       ├── hooks/
    │       └── index.ts     # API Pública
    └── shared/
        └── graphql/         # Config Apollo
```

## Princípios

### 1. Isolamento de Features (FSD)

Cada feature é autocontida com suas próprias entidades, use cases e infraestrutura.

```typescript
// Bom: Importar da API pública da feature
import { Task, useGetTasks } from '@repo/application';

// Também bom: Importar diretamente da feature
import { Task } from '@repo/domain/features/tasks';
```

### 2. Padrão de API Pública (FSD)

Cada feature expõe uma API pública controlada via `index.ts`:

```typescript
// features/tasks/index.ts
export { Task, TaskSchema } from './entities';
export { TaskRepositoryInterface } from './repositories';
export { useGetTasks, useCreateTask } from './hooks';
```

### 3. Regra de Dependência (Clean Architecture)

Dependências apontam para dentro:

```
Apps → Application → Domain
  ↓         ↓
Infrastructure
```

- **Domain**: Sem dependências externas
- **Application**: Depende apenas do Domain
- **Infrastructure**: Implementa interfaces do Domain
- **Apps**: Conecta tudo (Composition Root)

### 4. Módulos Compartilhados

Preocupações cross-cutting ficam em `shared/`:

- `domain/shared/core` - Result pattern
- `domain/shared/errors` - Erros de domínio
- `application/shared/hooks` - Hooks compartilhados
- `infrastructure/shared/graphql` - Config Apollo

## Adicionando uma Nova Feature

1. **Criar camada domain** (`packages/domain/src/features/{feature}/`)
   - Entidades com schemas Zod
   - Interfaces de repositório
   - Contratos para hooks

2. **Criar camada application** (`packages/application/src/features/{feature}/`)
   - Use cases
   - Hooks com DI
   - Funções factory

3. **Criar camada infrastructure** (`packages/infrastructure/src/features/{feature}/`)
   - Implementações de repositório
   - Mappers
   - Hooks Apollo

4. **Conectar no Composition Root** (`apps/web/src/providers/`)
   - Criar instância do repositório
   - Criar use cases
   - Prover hooks

Veja [Workflow: Adicionando uma Feature](../workflows/adding-a-feature.pt.md) para detalhes.

## Benefícios

1. **Escalabilidade Horizontal** - Adicione auth, subscriptions, payments sem poluir
2. **Ownership de Features** - Times podem ter ownership de features específicas
3. **API Pública Explícita** - Exports controlados via index.ts
4. **Onboarding Facilitado** - Estrutura autoexplicativa
5. **Menos Acoplamento** - Features isoladas com contratos claros
6. **Preparado para Monorepo** - Fácil extrair features para packages separados

## Referências

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
