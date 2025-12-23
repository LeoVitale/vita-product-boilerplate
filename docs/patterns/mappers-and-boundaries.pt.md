# Mappers e Boundaries (PT)

## Proposito

Proteger o sistema definindo **boundaries** (onde dado entra/sai) e **mappers** (como dado externo vira entidade de dominio).

## Quando usar

- Sempre que dado cruza um boundary: API → app, storage → app, input UI → app.
- Sempre que o shape externo for diferente do shape do dominio.

## Regra de boundary

No boundary voce deve:

1. **Validar** o dado externo (Zod)
2. **Mapear** tipos externos → entidades de dominio
3. Retornar tipos do dominio para as camadas internas

## Exemplo minimo (GraphQL → dominio)

```ts
// Infrastructure
const tasks = data.tasks.map((t) =>
  TaskSchema.parse({
    id: t.id,
    title: t.title,
    completed: t.completed,
  }),
);
```

## Por que isso importa

- Tipos do GraphQL/codegen mudam conforme o schema evolui.
- Regras do dominio nao devem acoplar em decisoes da API.
- Validacao no boundary evita “estado invalido” se espalhando.

## Erros comuns

- Expor types gerados do GraphQL direto pra UI.
- Deixar a UI decidir regra de mapping.
- Pular validacao e assumir que a API sempre retorna certo.

## Links

- GraphQL Codegen: `https://the-guild.dev/graphql/codegen`
- Zod: `https://zod.dev/`
