import { gql } from '@apollo/client';
import { TaskRepositoryInterface } from '@/domain/repositories/task-repository-interface';
import { Task } from '@/domain/entities/task';
import { apolloClient } from '@/infrastructure/graphql/apollo-client';

export class TaskRepositoryImpl implements TaskRepositoryInterface {
  async list(): Promise<Task[]> {
    const query = gql`
      query GetTasks {
        tasks {
          id
          title
          completed
        }
      }
    `;

    const { data } = await apolloClient.query<{ tasks: Task[] }>({
      query,
    });
    
    return data?.tasks ?? [];
  }
}
