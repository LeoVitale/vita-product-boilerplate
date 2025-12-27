/**
 * Infrastructure Layer - Public API
 *
 * This is the main entry point for the infrastructure package.
 * All public repositories, mappers, and hooks are re-exported from here.
 *
 * Structure:
 * - features/tasks - Task feature infrastructure
 * - shared - Cross-cutting infrastructure (Apollo config, etc.)
 */

// Features
export * from './features/tasks';

// Shared (currently empty, prepared for future)
// export * from './shared';
