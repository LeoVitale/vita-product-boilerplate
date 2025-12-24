import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TaskSchema } from '@repo/domain';

// Test that domain package is loaded correctly
console.log('Domain loaded:', !!TaskSchema);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Packages loaded: {TaskSchema ? '✓' : '✗'}</Text>
      <StatusBar style="auto" />
    </View>
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
