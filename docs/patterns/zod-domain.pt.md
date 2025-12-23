# Zod no Dominio (PT)

## Proposito

Usar **schemas Zod** como fonte unica de verdade para entidades do dominio:

- validacao em runtime (protege boundaries)
- tipagem estatica via `z.infer`

## Quando usar

- Sempre que dados vierem de fontes nao confiaveis (API, storage, input do usuario).
- Sempre que a entidade tiver invariantes (ex: titulo com minimo de caracteres).

## O que entra no Dominio

O dominio pode depender **apenas de Zod** (nada de Apollo, nada de React).

```ts
import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  completed: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;
```

## Onde a validacao acontece

- **Domain** define invariantes (schema).
- **Infrastructure** valida no boundary (API → dominio).
- **Application** assume entidades validas e aplica politicas de negocio.

## Tradeoffs (sem maquiagem)

- Pro: nao duplica tipo e validacao.
- Pro: boundaries mais seguros e refactors mais tranquilos.
- Con: dominio deixa de ser “0 deps”, mas continua framework-free.

## Erros comuns

- Fazer parse na UI (validacao deve acontecer no boundary).
- Aceitar dado cru da API como entidade de dominio sem parse.
- Colocar schema de DTO da API dentro do dominio (mantenha schema com shape do dominio).

## Links

- Zod: `https://zod.dev/`
