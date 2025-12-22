'use client';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/infrastructure/graphql/apollo-client';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}
