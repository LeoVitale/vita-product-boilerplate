import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './src/infrastructure/graphql/apollo-client';
import { UseCasesProvider } from './src/providers';
import { TaskListScreen } from './src/screens/TaskListScreen';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <UseCasesProvider>
        <TaskListScreen />
        <StatusBar style="auto" />
      </UseCasesProvider>
    </ApolloProvider>
  );
}
