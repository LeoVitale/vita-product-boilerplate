# Setup de Testes - Estratégia Híbrida

## Propósito

Este projeto utiliza uma **estratégia híbrida** de testes, combinando **Vitest** e **Jest** de acordo com as melhores práticas de cada ecossistema.

## Estratégia por Camada

### Vitest

Usado nos packages compartilhados e no app web:

- `packages/domain` - Testes de entidades e validação Zod
- `packages/application` - Testes de use cases e hooks React
- `packages/infrastructure` - Testes de repositórios e adapters
- `apps/web` - Testes de componentes Next.js

**Por quê?** Vitest é rápido, moderno, e integra bem com TypeScript e React.

### Jest

Usado no app API:

- `apps/api` - Testes NestJS (já configurado)

**Por quê?** Jest é o padrão estabelecido para NestJS.

## Como Rodar os Testes

### Rodar todos os testes (monorepo)

```bash
pnpm test
```

### Rodar testes de um package específico

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

### Rodar com UI (Vitest)

```bash
pnpm --filter @repo/application test:ui
```

### Rodar com coverage

```bash
pnpm --filter @repo/domain test:coverage
```

## Convenções

### Nomenclatura de Arquivos

- **Co-location**: testes devem ficar ao lado do arquivo testado
- Padrão: `arquivo.test.ts` ou `arquivo.test.tsx`
- Exemplo:
  ```
  use-get-tasks.ts
  use-get-tasks.test.tsx
  ```

### Nomenclatura de Testes

Use formato **Given / When / Then** para clareza:

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

## Configuração por Package

Cada package/app tem seu próprio `vitest.config.ts` ou `jest.config.js`:

- **Domain/Infrastructure**: `environment: 'node'`
- **Application/Web**: `environment: 'jsdom'` (para hooks/componentes React)
- **API**: Jest (configuração específica)

## Quando Escrever Testes

**TDD é obrigatório** para:

- Lógica de negócio (domain, use cases)
- Repositórios (infrastructure)
- Hooks customizados (application)

Veja: [TDD Rules](./../workflows/tdd.pt.md)

## Links

- Vitest: https://vitest.dev/
- Jest: https://jestjs.io/
- Testing Library: https://testing-library.com/
