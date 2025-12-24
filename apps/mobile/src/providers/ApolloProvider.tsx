import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';
import { MOBILE_API_CONFIG } from '@repo/config/env';

const client = new ApolloClient({
  link: new HttpLink({
    uri: MOBILE_API_CONFIG.graphqlEndpoint,
  }),
  cache: new InMemoryCache(),
});

interface ApolloProviderProps {
  children: ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}
