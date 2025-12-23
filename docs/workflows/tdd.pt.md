# Workflow de TDD (Vitest) (PT)

## Proposito

Evoluir o codigo com seguranca praticando **Test-Driven Development**: Red → Green → Refactor.

## Escopo neste repo

Neste boilerplate, TDD e obrigatorio para **todo codigo novo de feature**:

- `@repo/domain`
- `@repo/application`
- `@repo/infrastructure`

Mudancas apenas de documentacao ficam fora.

## Red → Green → Refactor

1. **Red**: escreva um teste que falha descrevendo o comportamento desejado.
2. **Green**: implemente o minimo para o teste passar.
3. **Refactor**: melhore o design mantendo testes verdes.

## O que testar (por camada)

### Domain

- invariantes de entidade (schemas Zod)
- funcoes puras / utilitarios

### Application

- comportamento de use case usando **repositorios fakes**
- caminhos de sucesso e falha do Result

### Infrastructure

- mapping no boundary (dado externo → entidade de dominio)
- testes de contrato para implementacoes (opcional depois)

## Estilo minimo de teste (exemplo)

```ts
// Given
// - um repo fake retornando tasks conhecidas
// When
// - GetTasksUseCase.execute() e chamado
// Then
// - retorna ok: true com as tasks esperadas
```

## Convencoes (recomendado)

- Prefira unit tests para domain + use cases.
- Testes deterministas (sem rede, sem tempo, sem aleatoriedade).
- Nomeie por comportamento (Given/When/Then).

## Links

- TDD (Martin Fowler): `https://martinfowler.com/bliki/TestDrivenDevelopment.html`
- Glossario Agile Alliance: `https://www.agilealliance.org/glossary/tdd/`
- Vitest: `https://vitest.dev/`
