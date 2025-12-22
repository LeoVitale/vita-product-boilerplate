import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const endpoint = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/graphql';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: endpoint,
  }),
  cache: new InMemoryCache(),
});

