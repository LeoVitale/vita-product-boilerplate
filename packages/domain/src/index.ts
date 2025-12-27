/**
 * Domain Layer - Public API
 *
 * This is the main entry point for the domain package.
 * All public types, schemas, and interfaces are re-exported from here.
 *
 * Structure:
 * - features/tasks - Task feature slice
 * - shared - Cross-cutting utilities (Result, Errors)
 */

// Features
export * from './features/tasks';

// Shared
export * from './shared';
