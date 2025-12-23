# Zod in the Domain (EN)

## Purpose

Use **Zod schemas** as the single source of truth for domain entities:

- runtime validation (protect boundaries)
- static typing via `z.infer`

## When to use

- Any time data can come from an untrusted source (API, storage, user input).
- Any time you define a domain entity with invariants (e.g., title min length).

## What goes in the Domain

Domain is allowed to depend on **Zod only** (no Apollo, no React).

```ts
import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  completed: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;
```

## Where validation happens

- **Domain** defines invariants (schema).
- **Infrastructure** validates external data at the boundary (API → domain).
- **Application** relies on domain entities already being valid and applies business policies.

## Tradeoffs (honest)

- Pro: no duplication between types and validation.
- Pro: safer boundaries and easier refactors.
- Con: domain is not “100% no-deps” (but stays framework-free).

## Common mistakes

- Parsing in UI components (validation should happen at boundaries).
- Accepting raw API data as domain entities without parsing.
- Putting schema for API DTOs inside the domain (keep domain schemas domain-shaped).

## Links

- Zod: `https://zod.dev/`
