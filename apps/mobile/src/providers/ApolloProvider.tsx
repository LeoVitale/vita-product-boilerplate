import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';

// Use your machine's IP address for development (localhost won't work on device)
// Replace with your actual IP for physical devices
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://192.168.15.7:4000/graphql';

const client = new ApolloClient({
  link: new HttpLink({
    uri: API_URL,
  }),
  cache: new InMemoryCache(),
});

interface ApolloProviderProps {
  children: ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}


