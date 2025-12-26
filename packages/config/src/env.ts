/**
 * Centralized Environment Configuration
 *
 * This file provides a single source of truth for environment variables across all apps.
 * Each app should use the appropriate prefixed variables:
 *   - Next.js: NEXT_PUBLIC_*
 *   - Expo: EXPO_PUBLIC_*
 *   - Node.js (API): No prefix needed
 *
 * See .env.example files in each app for documentation.
 */

/**
 * API Configuration (used by web app)
 */
export const API_CONFIG = {
  graphqlEndpoint:
    process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/graphql',
};

/**
 * Server Configuration (used by API)
 */
export const SERVER_CONFIG = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? '',
};

/**
 * Helper to validate required environment variables
 *
 * @throws Error if any required variable is missing
 */
export function validateEnv(required: string[]): void {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }
}
