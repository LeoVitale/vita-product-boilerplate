'use client';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '../src/infrastructure/graphql/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}
