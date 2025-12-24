# Adding a Feature (EN)

## Purpose

Provide a repeatable workflow to add features **professionally and safely** under Clean Architecture.

## When to use

Use this checklist any time you add a new business capability (new entity, new use case, new integration).

## The golden rule

Build from the inside out:

1. Domain (entities + contracts)
2. Application (use cases + hooks orchestration)
3. Infrastructure (implementations + mappers)
4. Apps (composition root + UI)

## Step-by-step

### 1) Domain: entity + invariants (Zod)

- Define a schema and type using `z.infer`.
- Keep entities domain-shaped, not API-shaped.

### 2) Domain: repository interface(s)

- Define the minimal contract your use case needs.
- Return `Result` from methods.

### 3) Application: use case (pure)

- Inject repository interfaces via constructor.
- Return `Result` to the caller.
- Do not import Apollo/GraphQL.

### 4) Infrastructure: repository implementation

- Call Apollo/HTTP/storage.
- Map external data into domain entities using Zod schemas.

### 5) Application: factory for the use case

- Create a factory function in `packages/application/src/factories/`.
- The factory receives dependencies (e.g., `ApolloClient`) and returns the ready-to-use use case.
- Example:
  ```typescript
  export function createGetTasksUseCase(client: ApolloClient) {
    const repository = new ApolloTaskRepository(client);
    return new GetTasksUseCase(repository);
  }
  ```

### 6) Application: shared hook

- Use Apollo `useQuery` directly with `fetchPolicy: 'cache-and-network'`.
- Validate data with Zod before returning.
- Expose standard interface: `{ data, isLoading, isError, error, refetch }`.
- Example:
  ```typescript
  export function useGetTasks() {
    const { data, loading, error, refetch } = useQuery(GetTasksDocument, {
      fetchPolicy: 'cache-and-network',
    });
    const tasks = data?.tasks?.map(t => TaskSchema.parse(t));
    return { data: tasks, isLoading: loading, isError: !!error, error, refetch };
  }
  ```

### 7) Apps: composition root (provider)

- Add the new use case to `UseCasesProvider` using the factory.
- Example:
  ```typescript
  const useCases = useMemo(
    () => ({
      getTasksUseCase: createGetTasksUseCase(client),
      // add new use cases here
    }),
    [client]
  );
  ```

### 8) UI: render

- Components/screens render based on hook output.
- Hooks come from `@repo/application` (don't create locally).
- Keep UI logic in UI; keep business rules in use cases.

## Done criteria

- All new feature code follows dependency direction (`docs/architecture/dependency-flow.en.md`).
- Mapping/validation happens at boundaries (infrastructure).
- No new business logic in `apps/*` components.

## Links

- Clean Architecture: `https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html`
