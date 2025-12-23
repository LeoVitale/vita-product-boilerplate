# Fluxo de Dependencias (PT)

## Proposito

Mostrar a **direcao das dependencias**, o **wiring em runtime** (composition root) e como os dados atravessam as camadas.

## Quando usar

- Voce esta criando uma feature e quer garantir imports e wiring corretos.
- Voce nao sabe onde deve acontecer mapping/validacao.

## Direcao de dependencias (compile-time)

```mermaid
graph LR
  Apps["apps/*"] --> App["@repo/application"]
  Apps --> Infra["@repo/infrastructure"]
  App --> Domain["@repo/domain"]
  Infra --> Domain
```

## Fluxo em runtime (exemplo: GetTasks)

```mermaid
sequenceDiagram
  participant UI as UI_Apps
  participant Hook as AppHook
  participant UC as UseCase
  participant Repo as RepoInterface
  participant Impl as ApolloRepoImpl

  UI->>Hook: useGetTasks(useCase)
  Hook->>UC: execute()
  UC->>Repo: findAll()
  Repo-->>Impl: implementado por
  Impl-->>UC: Result<Task[]>
  UC-->>Hook: Result<Task[]>
  Hook-->>UI: {data,isLoading,isError,...}
```

## Onde colocar mapping e validacao

- **Domain**: define invariantes (schema Zod). Domain nao busca dados.
- **Infrastructure**: converte dado externo (GraphQL) em entidade de dominio via Zod.
- **Application**: aplica regras de negocio (filtros, politicas, orquestracao) e retorna Result.

## Erros comuns

- Mapear GraphQL → dominio na UI.
- Usar exceptions para falhas esperadas em vez de Result.
- Infrastructure importar Application (direcao errada).
