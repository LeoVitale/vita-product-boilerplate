# Iniciando um Projeto Limpo

Este guia ajuda voce a remover a feature de exemplo `Tasks` e comecar do zero com seu proprio produto.

## Por que Remover Tasks?

A feature `Tasks` e **puramente educacional**. Ela existe para demonstrar:

- Como estruturar entidades, repositorios e use cases
- Como implementar Clean Architecture em todas as camadas
- Como conectar tudo no Composition Root
- Como escrever testes seguindo praticas de TDD

**Voce NAO precisara deste codigo no seu produto real.** E uma implementacao de referencia que deve ser removida antes de comecar a construir.

## Limpeza Rapida

Execute o script de limpeza a partir da raiz do projeto:

```bash
./scripts/clean-example.sh
# ou
pnpm clean:example
```

Isso vai:

- Remover a feature Tasks das camadas domain, application e infrastructure
- Remover operacoes GraphQL (queries/mutations)
- Remover modulo Tasks do backend e scripts de seed
- Limpar exports dos pacotes (arquivos index.ts)

## Passos Manuais Apos o Script

O script cuida da maior parte da limpeza, mas alguns passos requerem intervencao manual:

### 1. Schema Prisma

Edite `apps/api/prisma/schema.prisma`:

```prisma
// Remova todo este modelo:
model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("tasks")
}
```

Depois crie uma migration:

```bash
pnpm --filter api prisma migrate dev --name remove_tasks
```

### 2. Modulo da API

Edite `apps/api/src/app.module.ts`:

```typescript
// Remova este import:
import { TasksModule } from './tasks/tasks.module';

// E remova TasksModule do array de imports
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // ...
    }),
    // TasksModule, <-- Remova isto
  ],
})
export class AppModule {}
```

### 3. Composition Root Web

Edite `apps/web/src/providers/UseCasesProvider.tsx`:

Substitua por um provider vazio minimo:

```typescript
'use client';

import { createContext, useContext, ReactNode } from 'react';

/**
 * Composition Root Provider
 *
 * Conecte suas features aqui. Veja docs para exemplos.
 */

interface UseCasesContextValue {
  // Adicione seus use cases aqui
}

const UseCasesContext = createContext<UseCasesContextValue | null>(null);

interface UseCasesProviderProps {
  children: ReactNode;
}

export function UseCasesProvider({ children }: UseCasesProviderProps) {
  const useCases: UseCasesContextValue = {
    // Conecte seus use cases aqui
  };

  return (
    <UseCasesContext.Provider value={useCases}>
      {children}
    </UseCasesContext.Provider>
  );
}

export function useUseCases(): UseCasesContextValue {
  const context = useContext(UseCasesContext);
  if (!context) {
    throw new Error('useUseCases must be used within UseCasesProvider');
  }
  return context;
}
```

### 4. Composition Root Mobile

Aplique mudancas similares em `apps/mobile/src/providers/UseCasesProvider.tsx`.

### 5. UI Web

Edite `apps/web/app/page.tsx`:

Substitua pela sua landing page:

```typescript
export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Meu App</h1>
      <p>Comece a construir seu produto!</p>
    </div>
  );
}
```

### 6. UI Mobile

Remova ou substitua `apps/mobile/src/screens/TaskListScreen.tsx` com suas telas.

### 7. Regenerar Tipos GraphQL

```bash
pnpm generate
```

## Verificar Estado Limpo

Apos completar todos os passos, verifique se seu boilerplate esta limpo:

```bash
./scripts/verify-clean.sh
# ou
pnpm verify:clean
```

Isso verifica se existem referencias restantes a Tasks e confirma que voce esta pronto para comecar.

## Proximos Passos

1. **Gere sua primeira feature:**

   ```bash
   ./scripts/generate-feature.sh users
   # ou
   ./scripts/generate-feature.sh auth
   ```

2. **Siga o workflow de features:**

   Veja [Criando uma Feature](../workflows/adding-a-feature.pt.md) para passos detalhados.

3. **Inicie o desenvolvimento:**

   ```bash
   pnpm dev
   ```

## Problemas Comuns

### Erros de TypeScript apos limpeza

Execute `pnpm check-types` para ver todos os erros. Geralmente estao em:

- Composition Root (ainda importando Tasks)
- Componentes de pagina (ainda usando hooks de Tasks)

Corrija manualmente, depois execute novamente.

### Codegen GraphQL falha

Se voce removeu os arquivos GraphQL mas nao regenerou:

```bash
pnpm generate
```

### Erros do Prisma

Se o modelo Task foi removido mas o banco ainda tem a tabela:

```bash
pnpm --filter api prisma migrate dev --name cleanup
```

## Checklist de Limpeza Manual

- [ ] Removido modelo Task do schema Prisma
- [ ] Criada migration para remover tabela tasks
- [ ] Removido TasksModule do app.module.ts
- [ ] Limpado Web UseCasesProvider.tsx
- [ ] Limpado Mobile UseCasesProvider.tsx
- [ ] Substituida landing page web
- [ ] Removida/substituida TaskListScreen mobile
- [ ] Regenerados tipos GraphQL
- [ ] Executado verify-clean.sh com sucesso
- [ ] TypeScript compila sem erros

## Veja Tambem

- [Visao Geral da Arquitetura](../architecture/overview.pt.md)
- [Criando uma Feature](../workflows/adding-a-feature.pt.md)
- [Arquitetura Feature-Based](../architecture/feature-based.pt.md)
