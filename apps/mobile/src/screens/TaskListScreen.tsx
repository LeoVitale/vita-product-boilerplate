import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useGetTasks } from '@repo/application';
import { Task } from '@repo/domain';

function TaskItem({ task }: { task: Task }) {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskStatus}>{task.completed ? '✓' : '○'}</Text>
      <Text
        style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}
      >
        {task.title}
      </Text>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No tasks yet</Text>
      <Text style={styles.emptyStateSubtext}>
        Tasks will appear here when created
      </Text>
    </View>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <View style={styles.errorState}>
      <Text style={styles.errorStateText}>Error loading tasks</Text>
      <Text style={styles.errorStateSubtext}>{message}</Text>
    </View>
  );
}

export function TaskListScreen() {
  const { data: tasks, isLoading, isError, error, refetch } = useGetTasks();

  if (isLoading && !tasks) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  console.log('tasks', tasks);
  console.log('isLoading', isLoading);
  console.log('isError', isError);
  console.log('error', error);

  if (isError) {
    return <ErrorState message={error?.message ?? 'Unknown error'} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
        ListEmptyComponent={EmptyState}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={tasks?.length === 0 && styles.emptyListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 16,
    color: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskStatus: {
    fontSize: 20,
    marginRight: 12,
    color: '#007AFF',
  },
  taskTitle: {
    fontSize: 16,
    color: '#1a1a1a',
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  emptyListContainer: {
    flex: 1,
  },
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f5f5f5',
  },
  errorStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff3b30',
    marginBottom: 8,
  },
  errorStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
