# Composition Root - Pattern

## Purpose

**Composition Root** is the single place in the application where dependencies are "wired up". It's where we say "use this concrete repository for this use case".

## Why Use It?

### Problem: `new` scattered throughout the application

```typescript
// ❌ Bad: each component creates its own dependencies
function TaskList() {
  const client = useApolloClient();
  const repository = new ApolloTaskRepository(client);
  const useCase = new GetTasksUseCase(repository);
  const result = await useCase.execute();
  // ...
}
```

**Problems:**

- Duplicated code in each component
- Hard to test (hardcoded dependencies)
- Hard to swap implementations
- Violates DRY (Don't Repeat Yourself)

### Solution: Centralize dependency creation

```typescript
// ✅ Good: factory creates dependencies
export function createGetTasksUseCase(client: ApolloClient) {
  const repository = new ApolloTaskRepository(client);
  return new GetTasksUseCase(repository);
}

// ✅ Good: provider exposes ready-to-use use cases
function TaskList() {
  const { getTasksUseCase } = useUseCases();
  // ...
}
```

## How It Works in the Project

### 1. Factory (Application Layer)

The factory receives a **repository interface**, not an infrastructure implementation.
This keeps the Application Layer pure and infrastructure-agnostic.

```typescript
// packages/application/src/features/tasks/factories/use-cases.factory.ts
import { TaskRepositoryInterface } from '@repo/domain';
import { GetTasksUseCase } from '../use-cases/get-tasks.use-case';

export function createTaskUseCases(repository: TaskRepositoryInterface) {
  return {
    getTasksUseCase: new GetTasksUseCase(repository),
    createTaskUseCase: new CreateTaskUseCase(repository),
    toggleTaskUseCase: new ToggleTaskUseCase(repository),
    deleteTaskUseCase: new DeleteTaskUseCase(repository),
  };
}
```

### 2. Provider (True Composition Root)

The **Provider** is the true Composition Root - it creates infrastructure implementations
and injects them into use cases. It also wires up **mutation hooks** via React Context providers.

```typescript
// apps/web/src/providers/UseCasesProvider.tsx
import { ApolloTaskRepository, useApolloCreateTask, useApolloToggleTask, useApolloDeleteTask } from '@repo/infrastructure';
import { createTaskUseCases, CreateTaskMutationProvider, ToggleTaskMutationProvider, DeleteTaskMutationProvider } from '@repo/application';

export function UseCasesProvider({ children }) {
  const client = useApolloClient();

  const { taskUseCases, tasksQueryProvider } = useMemo(() => {
    const taskRepository = new ApolloTaskRepository(client as GraphQLClient);
    return {
      taskUseCases: createTaskUseCases(taskRepository),
      tasksQueryProvider: useApolloTasksQuery,
    };
  }, [client]);

  return (
    <UseCasesContext.Provider value={{ ...taskUseCases }}>
      <TasksQueryProvider value={tasksQueryProvider}>
        <CreateTaskMutationProvider value={useApolloCreateTask}>
          <ToggleTaskMutationProvider value={useApolloToggleTask}>
            <DeleteTaskMutationProvider value={useApolloDeleteTask}>
              {children}
            </DeleteTaskMutationProvider>
          </ToggleTaskMutationProvider>
        </CreateTaskMutationProvider>
      </TasksQueryProvider>
    </UseCasesContext.Provider>
  );
}
```

### 3. Access Hook

```typescript
// apps/web/src/providers/UseCasesProvider.tsx
export function useUseCases() {
  const context = useContext(UseCasesContext);
  if (!context) {
    throw new Error('useUseCases must be used within UseCasesProvider');
  }
  return context;
}
```

### 4. Usage in UI

```typescript
// apps/web/app/page.tsx
function Home() {
  const { getTasksUseCase } = useUseCases();
  // use case comes ready with all dependencies injected
}
```

## Creation Flow

```mermaid
graph TD
    App[App Root] --> Provider[UseCasesProvider]
    Provider --> Repo[new ApolloTaskRepository]
    Provider --> Factory[createGetTasksUseCase]
    Factory --> UseCase[new GetTasksUseCase]
    UseCase --> Component[Component]
```

> **Note**: The Provider creates the repository (infrastructure) and passes it to the factory.
> The factory only orchestrates - it doesn't know about concrete implementations.

## When to Use

### ✅ Use Composition Root for:

- Creating **use case** instances
- Creating **repository** instances
- Injecting **HTTP clients** (Apollo, Axios, etc.)
- Configuring **external services** (analytics, auth, etc.)

### ❌ DON'T use for:

- Business logic (goes in use case)
- Data validation (goes in domain with Zod)
- React components (use directly)
- Simple hooks (use directly)

## Benefits

### 1. Testability

```typescript
// Test: inject mock repository easily
const mockRepository: TaskRepositoryInterface = {
  findAll: vi.fn().mockResolvedValue(success([{ id: '1', title: 'Test' }])),
};
const useCase = createGetTasksUseCase(mockRepository);
```

### 2. Flexibility

```typescript
// Swap implementation in the Provider (Composition Root)
const useCases = useMemo(() => {
  // Before: ApolloTaskRepository
  // After: RestTaskRepository
  const taskRepository = new RestTaskRepository(axiosClient);

  return {
    getTasksUseCase: createGetTasksUseCase(taskRepository),
  };
}, [axiosClient]);
```

### 3. DRY (Don't Repeat Yourself)

Without composition root:

- 10 components = 10x `new ApolloTaskRepository` + `new GetTasksUseCase`

With composition root:

- 10 components = 10x `useUseCases()` (factory called 1x)

## Common Mistakes

### ❌ Creating dependencies inside components

```typescript
// Bad: creation logic scattered
function TaskList() {
  const repo = new ApolloTaskRepository(client);
  const useCase = new GetTasksUseCase(repo);
  // ...
}
```

### ✅ Use provider/factory

```typescript
// Good: dependencies come ready
function TaskList() {
  const { getTasksUseCase } = useUseCases();
  // ...
}
```

### ❌ Multiple composition roots

```typescript
// Bad: factories scattered in multiple places
// apps/web/utils/factories.ts
// apps/web/lib/use-cases.ts
// apps/web/hooks/factories.ts
```

### ✅ Single centralized provider

```typescript
// Good: single place
// apps/web/src/providers/UseCasesProvider.tsx
```

### ❌ Business logic in provider

```typescript
// Bad: business rule in provider
export function UseCasesProvider({ children }) {
  const client = useApolloClient();

  // ❌ Don't do this here!
  const filteredTasks = tasks.filter(t => t.completed);

  return <Context.Provider value={...} />;
}
```

### ✅ Provider only assembles dependencies

```typescript
// Good: provider creates repositories and wires up use cases
export function UseCasesProvider({ children }) {
  const client = useApolloClient();

  const useCases = useMemo(() => {
    const taskRepository = new ApolloTaskRepository(client);
    return {
      getTasksUseCase: createGetTasksUseCase(taskRepository),
    };
  }, [client]);

  return <Context.Provider value={useCases}>{children}</Context.Provider>;
}
```

## Feature-Based Structure

With feature-based architecture, factories and hooks are organized by feature:

```
packages/application/src/features/tasks/
├── factories/
│   └── use-cases.factory.ts  # createTaskUseCases
├── hooks/
│   ├── use-get-tasks.ts      # TasksQueryProvider + useGetTasks
│   ├── use-create-task.ts    # CreateTaskMutationProvider + useCreateTask
│   └── ...
└── use-cases/
    └── get-tasks.use-case.ts
```

See [Feature-Based Architecture](../architecture/feature-based.en.md) for the full structure.

## Links

- Mark Seemann - Dependency Injection: https://blog.ploeh.dk/2011/07/28/CompositionRoot/
- Clean Architecture (Uncle Bob): https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- Dependency Injection Principles: https://www.martinfowler.com/articles/injection.html
