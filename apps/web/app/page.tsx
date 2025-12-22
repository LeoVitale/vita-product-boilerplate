'use client';

import { useGetTasks } from '../src/application/hooks/use-get-tasks';
import styles from './page.module.css';

export default function Home() {
  const { data: tasks, isLoading, isError, error } = useGetTasks();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Tasks from API</h1>
        {isLoading && <p>Loading tasks...</p>}
        {isError && <p>Error loading tasks: {(error as Error).message}</p>}
        {tasks && (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
