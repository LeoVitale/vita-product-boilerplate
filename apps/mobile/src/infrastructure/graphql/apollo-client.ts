import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// In Expo, use EXPO_PUBLIC_API_URL or fallback to localhost
// For physical device testing, use your machine's IP address
const GRAPHQL_ENDPOINT =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/graphql';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});

