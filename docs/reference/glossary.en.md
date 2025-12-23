# Glossary (EN)

## Purpose

Align vocabulary so the repo is approachable regardless of seniority.

## Terms

- **Domain**: the core business model (entities + invariants + contracts).
- **Entity**: a business object with invariants (e.g., `Task`).
- **Invariant**: a rule that must always be true (e.g., title min length).
- **Application**: orchestration of business rules via use cases and hooks.
- **Use Case**: a unit of business behavior (e.g., `GetTasksUseCase`).
- **Repository (interface)**: a contract describing data operations the app needs.
- **Infrastructure**: technical implementations (Apollo, storage, adapters).
- **Adapter**: code that talks to an external system (API, DB, storage).
- **Boundary**: where data enters/leaves the system (API response, storage read).
- **Mapper**: transforms external data into domain entities (often with validation).
- **Composition Root**: app-level place where dependencies are wired together.
- **Dependency Injection (DI)**: passing dependencies as parameters/constructors.
- **Result Pattern**: returning `{ ok: true } | { ok: false }` instead of throwing.
- **TDD**: Test-Driven Development (Red → Green → Refactor).
- **Unit test**: fast test of a small piece (domain/use case) with fakes.
- **Contract test**: ensures an implementation matches an interface contract.
