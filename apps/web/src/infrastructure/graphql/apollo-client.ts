import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { API_CONFIG } from '@repo/config/env';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: API_CONFIG.graphqlEndpoint,
  }),
  cache: new InMemoryCache(),
});
