# Injecao de Dependencia (PT)

## Proposito

Manter o core testavel e desacoplado **injetando dependencias** (repositorios) ao inves de importar implementacoes concretas.

## Quando usar

- Sempre para use cases e repositorios.
- Sempre que um modulo precisar de um adapter (API client, storage, clock, UUID, etc.).

## Regra pratica

- **Domain** define interfaces.
- **Infrastructure** implementa.
- **Apps** fazem o wiring (composition root).

## Exemplo minimo

```ts
// Application
export class GetTasksUseCase {
  constructor(private repo: TaskRepositoryInterface) {}
}

// Apps (composition root)
const repo = new ApolloTaskRepository(apolloClient);
const useCase = new GetTasksUseCase(repo);
```

## Por que isso importa

- Use cases ficam faceis de testar com repo fake.
- Infra pode ser trocada (Apollo → REST) sem tocar no dominio/application.

## Erros comuns

- `new ApolloTaskRepository()` dentro do use case.
- Usar singleton global pra tudo em vez de injetar.
- Infrastructure importar Application (direcao errada).

## Links

- Composition root: `https://blog.ploeh.dk/2011/07/28/CompositionRoot/`
