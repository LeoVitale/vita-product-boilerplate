# Result Pattern (EN)

## Purpose

Make error handling **explicit and typed** by returning a `Result` instead of throwing for expected failures.

## When to use

- Any use case or repository method that can fail in a predictable way.
- When you want callers (hooks/UI) to handle failures without `try/catch`.

## The shape we use

In `@repo/domain` we use:

```ts
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

## Minimal example

```ts
// use-case
const result = await useCase.execute();
if (result.ok) {
  return result.value;
}
// handle result.error
```

## Why this is better than exceptions (for business flow)

- It forces the caller to handle failure paths.
- It documents failure in the type system.
- It avoids mixing “expected” business errors with truly unexpected exceptions.

## Common mistakes

- Throwing `Error` for expected business outcomes (e.g., validation).
- Returning `null` or `undefined` instead of a typed failure.
- Swallowing errors and returning empty values silently.

## Links

- Railway Oriented Programming: `https://fsharpforfunandprofit.com/rop/`
- Rust Result: `https://doc.rust-lang.org/std/result/`
