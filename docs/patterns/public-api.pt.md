# Padrão de API Pública

O padrão de API Pública é um conceito central do Feature-Sliced Design (FSD) que controla o que cada módulo expõe para o mundo externo.

## Conceito

Cada feature/módulo tem um arquivo `index.ts` que define explicitamente o que é publicamente acessível:

```typescript
// features/tasks/index.ts - Esta É a API pública
export { Task, TaskSchema } from './entities';
export { useGetTasks } from './hooks';
// Detalhes de implementação interna NÃO são exportados
```

## Benefícios

1. **Encapsulamento** - Detalhes internos permanecem ocultos
2. **Segurança em Refatorações** - Mude internos sem quebrar consumidores
3. **Contratos Claros** - Explícito o que é público vs privado
4. **Melhor Suporte de IDE** - Autocomplete mostra apenas exports públicos

## Implementação

### Estrutura de Camadas

```
feature/
├── entities/
│   ├── task.ts           # Interno
│   └── index.ts          # API Pública para entities
├── hooks/
│   ├── use-get-tasks.ts  # Interno
│   └── index.ts          # API Pública para hooks
└── index.ts              # API Pública da Feature
```

### Exemplo

```typescript
// features/tasks/entities/index.ts
export { Task, TaskSchema, CreateTaskInput } from './task';

// features/tasks/hooks/index.ts
export { useGetTasks, TasksQueryProvider } from './use-get-tasks';
export { useCreateTask, CreateTaskMutationProvider } from './use-create-task';

// features/tasks/index.ts (API pública principal)
export * from './entities';
export * from './hooks';
export * from './use-cases';
```

## Regras

1. **Sempre importe do index.ts** - Nunca importe diretamente de arquivos internos
2. **Exporte apenas o necessário** - Não exporte tudo por padrão
3. **Tipos devem ser exportados** - Use `export type { }` para exports só de tipos
4. **Documente a API pública** - Adicione comentários JSDoc

## Erros Comuns

### ❌ Ruim: Importando de caminhos internos

```typescript
import { Task } from '@repo/domain/features/tasks/entities/task';
```

### ✅ Bom: Importando da API pública

```typescript
import { Task } from '@repo/domain';
// ou
import { Task } from '@repo/domain/features/tasks';
```

## Referências

- [FSD Public API](https://feature-sliced.design/docs/reference/public-api)
- [Barrel Files in TypeScript](https://basarat.gitbook.io/typescript/main-1/barrel)
