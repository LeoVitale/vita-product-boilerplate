/**
 * Domain Layer - Public API
 *
 * This is the main entry point for the domain package.
 * All public types, schemas, and interfaces are re-exported from here.
 *
 * Structure:
 * - features/ - Feature slices (add your features here)
 * - shared - Cross-cutting utilities (Result, Errors)
 */

// ============================================================================
// EXAMPLE FEATURE (Educational Purpose Only)
// ============================================================================
// The 'tasks' feature demonstrates Clean Architecture implementation.
// Remove before starting your project: pnpm clean:example
// See: docs/getting-started/clean-slate.en.md
// ============================================================================
export * from './features/tasks';

// Shared
export * from './shared';
