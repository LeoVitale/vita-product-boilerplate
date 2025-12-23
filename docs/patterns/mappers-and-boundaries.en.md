# Mappers and Boundaries (EN)

## Purpose

Protect the system by defining **boundaries** (where data enters/leaves) and **mappers** (how external data becomes domain entities).

## When to use

- Any time data crosses a boundary: API → app, storage → app, UI input → app.
- Any time the external shape differs from your domain shape.

## Boundary rule

At boundaries you must:

1. **Validate** external data (Zod)
2. **Map** external types → domain entities
3. Return domain types to the inner layers

## Minimal example (GraphQL → domain)

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

## Why this matters

- GraphQL/codegen types change as your schema evolves.
- Domain rules should not be coupled to API decisions.
- Validation at boundaries prevents “invalid states” from spreading.

## Common mistakes

- Exposing GraphQL generated types directly to UI.
- Letting UI decide mapping rules.
- Skipping validation and assuming API data is always correct.

## Links

- GraphQL Codegen: `https://the-guild.dev/graphql/codegen`
- Zod: `https://zod.dev/`
