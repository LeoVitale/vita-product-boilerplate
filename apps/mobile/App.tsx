import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './src/infrastructure/graphql/apollo-client';
import { UseCasesProvider } from './src/providers';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <UseCasesProvider>
        <View style={styles.container}>
          <Text>Apollo Client configured ✓</Text>
          <StatusBar style="auto" />
        </View>
      </UseCasesProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
