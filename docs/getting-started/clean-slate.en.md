# Starting a Clean Project

This guide helps you remove the example `Tasks` feature and start fresh with your own product.

## Why Remove Tasks?

The `Tasks` feature is **purely educational**. It exists to demonstrate:

- How to structure entities, repositories, and use cases
- How to implement Clean Architecture across all layers
- How to wire everything in the Composition Root
- How to write tests following TDD practices

**You will NOT need this code in your actual product.** It's a reference implementation that should be removed before you start building.

## Quick Clean

Run the cleanup script from the project root:

```bash
./scripts/clean-example.sh
# or
pnpm clean:example
```

This will:

- Remove Tasks feature from domain, application, and infrastructure layers
- Remove GraphQL operations (queries/mutations)
- Remove backend Tasks module and seed scripts
- Clean package exports (index.ts files)

## Manual Steps After Script

The script handles most of the cleanup, but some steps require manual intervention:

### 1. Prisma Schema

Edit `apps/api/prisma/schema.prisma`:

```prisma
// Remove this entire model:
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

Then create a migration:

```bash
pnpm --filter api prisma migrate dev --name remove_tasks
```

### 2. API Module

Edit `apps/api/src/app.module.ts`:

```typescript
// Remove this import:
import { TasksModule } from './tasks/tasks.module';

// And remove TasksModule from imports array
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // ...
    }),
    // TasksModule, <-- Remove this
  ],
})
export class AppModule {}
```

### 3. Web Composition Root

Edit `apps/web/src/providers/UseCasesProvider.tsx`:

Replace with a minimal empty provider:

```typescript
'use client';

import { createContext, useContext, ReactNode } from 'react';

/**
 * Composition Root Provider
 *
 * Wire up your features here. See docs for examples.
 */

interface UseCasesContextValue {
  // Add your use cases here
}

const UseCasesContext = createContext<UseCasesContextValue | null>(null);

interface UseCasesProviderProps {
  children: ReactNode;
}

export function UseCasesProvider({ children }: UseCasesProviderProps) {
  const useCases: UseCasesContextValue = {
    // Wire up your use cases here
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

### 4. Mobile Composition Root

Apply similar changes to `apps/mobile/src/providers/UseCasesProvider.tsx`.

### 5. Web UI

Edit `apps/web/app/page.tsx`:

Replace with your landing page:

```typescript
export default function Home() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>Start building your product!</p>
    </div>
  );
}
```

### 6. Mobile UI

Remove or replace `apps/mobile/src/screens/TaskListScreen.tsx` with your screens.

### 7. Regenerate GraphQL Types

```bash
pnpm generate
```

## Verify Clean State

After completing all steps, verify your boilerplate is clean:

```bash
./scripts/verify-clean.sh
# or
pnpm verify:clean
```

This checks for any remaining Tasks references and confirms you're ready to start.

## Next Steps

1. **Generate your first feature:**

   ```bash
   ./scripts/generate-feature.sh users
   # or
   ./scripts/generate-feature.sh auth
   ```

2. **Follow the feature workflow:**

   See [Adding a Feature](../workflows/adding-a-feature.en.md) for detailed steps.

3. **Start development:**

   ```bash
   pnpm dev
   ```

## Common Issues

### TypeScript errors after cleanup

Run `pnpm check-types` to see all errors. Usually, they're in:

- Composition Root (still importing Tasks)
- Page components (still using Tasks hooks)

Fix these manually, then run again.

### GraphQL codegen fails

If you removed the GraphQL files but haven't regenerated:

```bash
pnpm generate
```

### Prisma errors

If the Task model is removed but database still has the table:

```bash
pnpm --filter api prisma migrate dev --name cleanup
```

## Manual Cleanup Checklist

- [ ] Removed Task model from Prisma schema
- [ ] Created migration to remove tasks table
- [ ] Removed TasksModule from app.module.ts
- [ ] Cleaned Web UseCasesProvider.tsx
- [ ] Cleaned Mobile UseCasesProvider.tsx
- [ ] Replaced web landing page
- [ ] Removed/replaced mobile TaskListScreen
- [ ] Regenerated GraphQL types
- [ ] Ran verify-clean.sh successfully
- [ ] TypeScript compiles without errors

## See Also

- [Architecture Overview](../architecture/overview.en.md)
- [Adding a Feature](../workflows/adding-a-feature.en.md)
- [Feature-Based Architecture](../architecture/feature-based.en.md)
