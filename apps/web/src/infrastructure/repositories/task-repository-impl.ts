import { gql } from 'graphql-request';
import { TaskRepositoryInterface } from '../../domain/repositories/task-repository-interface';
import { Task } from '../../domain/entities/task';
import { graphqlClient } from '../graphql/graphql-client';

export class TaskRepositoryImpl implements TaskRepositoryInterface {
  async list(): Promise<Task[]> {
    const query = gql`
      query {
        tasks {
          id
          title
          completed
        }
      }
    `;

    const data = await graphqlClient.request<{ tasks: Task[] }>(query);
    return data.tasks;
  }
}

