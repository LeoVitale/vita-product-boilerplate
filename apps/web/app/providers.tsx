'use client';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/infrastructure/graphql/apollo-client';
import { UseCasesProvider } from '@/providers';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <UseCasesProvider>{children}</UseCasesProvider>
    </ApolloProvider>
  );
}
