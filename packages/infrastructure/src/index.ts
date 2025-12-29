/**
 * Infrastructure Layer - Public API
 *
 * This is the main entry point for the infrastructure package.
 * All public repositories, mappers, and hooks are re-exported from here.
 *
 * Structure:
 * - features/ - Feature slices (add your features here)
 * - shared - Cross-cutting infrastructure (Apollo config, etc.)
 */

// ============================================================================
// EXAMPLE FEATURE (Educational Purpose Only)
// ============================================================================
// The 'tasks' feature demonstrates Clean Architecture implementation.
// Remove before starting your project: pnpm clean:example
// See: docs/getting-started/clean-slate.en.md
// ============================================================================
export * from './features/tasks';

// Shared (currently empty, prepared for future)
// export * from './shared';
