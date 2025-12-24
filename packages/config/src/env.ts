/**
 * Centralized API configuration
 * 
 * This file provides a single source of truth for API endpoints across all apps.
 */

export const API_CONFIG = {
  graphqlEndpoint:
    process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/graphql',
};

export const MOBILE_API_CONFIG = {
  graphqlEndpoint:
    process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/graphql',
};

