# Criando uma Feature (PT)

## Proposito

Fornecer um workflow repetivel para criar features de forma **profissional e segura** seguindo Clean Architecture.

## Quando usar

Use este checklist sempre que voce adicionar uma nova capacidade (nova entidade, novo use case, nova integracao).

## Regra de ouro

Construa de dentro para fora:

1. Domain (entidades + contratos)
2. Application (use cases + orquestracao via hooks)
3. Infrastructure (implementacoes + mappers)
4. Apps (composition root + UI)

## Passo a passo

### 1) Domain: entidade + invariantes (Zod)

- Defina schema e type via `z.infer`.
- Mantenha a entidade com shape do dominio, nao da API.

### 2) Domain: interface(s) de repositorio

- Defina o contrato minimo que o use case precisa.
- Retorne `Result` nos metodos.

### 3) Application: use case (puro)

- Injete interfaces de repositorio no construtor.
- Retorne `Result` para quem chamou.
- Nao importe Apollo/GraphQL.

### 4) Infrastructure: implementacao do repositorio

- Chame Apollo/HTTP/storage.
- Mapeie dado externo para entidade do dominio usando schemas Zod.

### 5) Application: factory para o use case

- Crie uma factory function em `packages/application/src/factories/`.
- A factory recebe dependencias (ex: `ApolloClient`) e retorna o use case pronto.
- Exemplo:
  ```typescript
  export function createGetTasksUseCase(client: ApolloClient) {
    const repository = new ApolloTaskRepository(client);
    return new GetTasksUseCase(repository);
  }
  ```

### 6) Application: hook compartilhado

- Use Apollo `useQuery` diretamente com `fetchPolicy: 'cache-and-network'`.
- Valide dados com Zod antes de retornar.
- Exponha interface padrao: `{ data, isLoading, isError, error, refetch }`.
- Exemplo:
  ```typescript
  export function useGetTasks() {
    const { data, loading, error, refetch } = useQuery(GetTasksDocument, {
      fetchPolicy: 'cache-and-network',
    });
    const tasks = data?.tasks?.map((t) => TaskSchema.parse(t));
    return {
      data: tasks,
      isLoading: loading,
      isError: !!error,
      error,
      refetch,
    };
  }
  ```

### 7) Apps: composition root (provider)

- Adicione o novo use case ao `UseCasesProvider` usando a factory.
- Exemplo:
  ```typescript
  const useCases = useMemo(
    () => ({
      getTasksUseCase: createGetTasksUseCase(client),
      // adicione aqui novos use cases
    }),
    [client],
  );
  ```

### 8) UI: renderizar

- Componentes/telas renderizam com base no hook.
- Hooks vem de `@repo/application` (nao crie localmente).
- Regra de negocio fica no use case; UI fica na UI.

## Critetrios de pronto

- Todo o codigo novo segue a direcao de dependencias (`docs/architecture/dependency-flow.pt.md`).
- Mapping/validacao acontece no boundary (infrastructure).
- Nao existe nova regra de negocio em componentes de `apps/*`.

## Links

- Clean Architecture: `https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html`
