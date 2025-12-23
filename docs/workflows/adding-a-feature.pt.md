# Criando uma Feature (PT)

## Proposito

Fornecer um workflow repetivel para criar features de forma **profissional e segura** seguindo Clean Architecture.

## Quando usar

Use este checklist sempre que voce adicionar uma nova capacidade (nova entidade, novo use case, nova integracao).

## Regra de ouro

Construa de dentro para fora:

1. Domain (entidades + contratos)
2. Application (use cases + orquestracao via hooks)
3. Infrastructure (implementacoes + mappers)
4. Apps (composition root + UI)

## Passo a passo

### 1) Domain: entidade + invariantes (Zod)

- Defina schema e type via `z.infer`.
- Mantenha a entidade com shape do dominio, nao da API.

### 2) Domain: interface(s) de repositorio

- Defina o contrato minimo que o use case precisa.
- Retorne `Result` nos metodos.

### 3) Application: use case (puro)

- Injete interfaces de repositorio no construtor.
- Retorne `Result` para quem chamou.
- Nao importe Apollo/GraphQL.

### 4) Infrastructure: implementacao do repositorio

- Chame Apollo/HTTP/storage.
- Mapeie dado externo para entidade do dominio usando schemas Zod.

### 5) Application: hook compartilhado

- Gerencie estado amigavel para UI: `{ data, isLoading, isError, error, refetch }`.
- Chame o use case e exponha um contrato estavel.

### 6) Apps: composition root (wiring)

- Instancie repositorio + use case com `useMemo` (ou provider).
- Injete o use case no hook (ou via provider de dependencias).

### 7) UI: renderizar

- Componentes/telas renderizam com base no hook.
- Regra de negocio fica no use case; UI fica na UI.

## Critetrios de pronto

- Todo o codigo novo segue a direcao de dependencias (`docs/architecture/dependency-flow.pt.md`).
- Mapping/validacao acontece no boundary (infrastructure).
- Nao existe nova regra de negocio em componentes de `apps/*`.

## Links

- Clean Architecture: `https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html`
