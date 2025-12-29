# Code Templates

This directory contains reference templates for AI coding assistants and developers.

## Purpose

These templates serve as:

1. **Reference for AI agents** - The Cursor rules can point to these as examples
2. **Copy-paste starting points** - Developers can copy and adapt these
3. **Documentation** - Shows the expected patterns for each type of file

## Available Templates

| Template                           | Description              | Target Location                                        |
| ---------------------------------- | ------------------------ | ------------------------------------------------------ |
| `entity.template.ts`               | Domain entity with Zod   | `packages/domain/src/features/*/entities/`             |
| `repository-interface.template.ts` | Repository contract      | `packages/domain/src/features/*/repositories/`         |
| `use-case.template.ts`             | Application use case     | `packages/application/src/features/*/use-cases/`       |
| `apollo-repository.template.ts`    | Apollo implementation    | `packages/infrastructure/src/features/*/repositories/` |
| `mapper.template.ts`               | GraphQL to Domain mapper | `packages/infrastructure/src/features/*/mappers/`      |
| `hook.template.ts`                 | React hooks              | `packages/*/src/features/*/hooks/`                     |
| `test.template.ts`                 | Test patterns by layer   | Same folder as tested file                             |

## How to Use

### For AI Agents

Reference templates in Cursor rules using the `@` syntax:

```mdc
When creating a new entity, follow the pattern in:
@entity.template.ts
```

### For Developers

1. Copy the relevant template
2. Replace `EntityName` with your actual entity name
3. Replace `[description]` placeholders with actual descriptions
4. Adjust fields and methods as needed

## Naming Conventions

Templates use placeholder names that should be replaced:

- `EntityName` → Your entity (e.g., `UserProfile`)
- `entityName` → camelCase (e.g., `userProfile`)
- `entity-name` → kebab-case (e.g., `user-profile`)
- `entity_name` → snake_case (e.g., `user_profile`)
- `ENTITY_NAME` → UPPER_CASE (e.g., `USER_PROFILE`)

## Template Updates

When updating templates:

1. Keep them in sync with the actual codebase patterns
2. Include comprehensive JSDoc comments
3. Show both common and edge cases
4. Keep imports as close to real usage as possible
