import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Environment-based configuration for multi-environment support (WSL, Mac, etc.)
// Configure via .env file - see .env.example for documentation
const API_HOST = process.env.EXPO_PUBLIC_API_HOST ?? 'localhost';
const API_PORT = process.env.EXPO_PUBLIC_API_PORT ?? '4000';

// Allow full URL override for special cases (e.g., ngrok tunnel)
const GRAPHQL_ENDPOINT =
  process.env.EXPO_PUBLIC_API_URL ?? `http://${API_HOST}:${API_PORT}/graphql`;

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});
