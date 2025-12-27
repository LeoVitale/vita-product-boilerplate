# Glossario (PT)

## Proposito

Alinhar vocabulario para que o repo seja acessivel independente da senioridade.

## Termos

- **Domain**: modelo central do negocio (entidades + invariantes + contratos).
- **Entidade**: objeto de negocio com invariantes (ex: `Task`).
- **Invariante**: regra que deve ser sempre verdadeira (ex: titulo minimo).
- **Application**: orquestracao das regras via use cases e hooks.
- **Use Case**: unidade de comportamento de negocio (ex: `GetTasksUseCase`).
- **Repositorio (interface)**: contrato das operacoes de dados que a app precisa.
- **Infrastructure**: implementacoes tecnicas (Apollo, storage, adapters).
- **Adapter**: codigo que conversa com um sistema externo (API, DB, storage).
- **Boundary**: ponto onde dados entram/saem do sistema (response da API, leitura do storage).
- **Mapper**: transforma dado externo em entidade do dominio (geralmente validando).
- **Composition Root**: local da app onde dependencias sao conectadas.
- **Injecao de Dependencia (DI)**: passar dependencias por parametros/construtor.
- **Result Pattern**: retornar `{ ok: true } | { ok: false }` em vez de `throw`.
- **TDD**: Test-Driven Development (Red → Green → Refactor).
- **Unit test**: teste rapido de uma parte pequena (domain/use case) usando fakes.
- **Contract test**: garante que uma implementacao respeita o contrato da interface.
- **Feature-Sliced Design (FSD)**: metodologia arquitetural focada em isolamento de features e APIs publicas.
- **Feature**: fatia autocontida de funcionalidade (ex: tasks, auth, subscriptions).
- **API Publica**: exports controlados de um modulo via index.ts (barrel file).
- **Barrel file**: index.ts que re-exporta membros publicos de um modulo.
- **Modulo compartilhado**: utilitarios cross-cutting usados por multiplas features.
