# Result Pattern (PT)

## Proposito

Deixar o tratamento de erros **explicito e tipado** retornando `Result` ao inves de `throw` para falhas esperadas.

## Quando usar

- Qualquer use case ou repositorio que pode falhar de forma previsivel.
- Quando voce quer que hooks/UI lidem com falhas sem `try/catch`.

## O formato que usamos

No `@repo/domain` usamos:

```ts
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

## Exemplo minimo

```ts
// use-case
const result = await useCase.execute();
if (result.ok) {
  return result.value;
}
// tratar result.error
```

## Por que isso e melhor que exceptions (para fluxo de negocio)

- Forca o caller a lidar com o caminho de falha.
- Documenta falhas no sistema de tipos.
- Evita misturar erro esperado com excecao inesperada.

## Erros comuns

- Dar `throw` para falha esperada (ex: validacao).
- Retornar `null`/`undefined` em vez de um erro tipado.
- Engolir o erro e retornar vazio sem avisar.

## Links

- Railway Oriented Programming: `https://fsharpforfunandprofit.com/rop/`
- Rust Result: `https://doc.rust-lang.org/std/result/`
