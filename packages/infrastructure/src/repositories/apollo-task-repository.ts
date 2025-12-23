import {
  GetTasksDocument,
  GetTasksQuery,
  GetTasksQueryVariables,
} from '@repo/graphql';
import {
  Task,
  TaskRepositoryInterface,
  Result,
  success,
  failure,
  TaskSchema,
} from '@repo/domain';

export interface GraphQLClient {
  query<T = any, V = any>(options: any): Promise<{ data?: T }>;
}

export class ApolloTaskRepository implements TaskRepositoryInterface {
  constructor(private client: GraphQLClient) {}

  async findAll(): Promise<Result<Task[]>> {
    try {
      const { data } = await this.client.query<
        GetTasksQuery,
        GetTasksQueryVariables
      >({
        query: GetTasksDocument,
      });

      if (!data?.tasks) {
        return success([]);
      }

      // Mapeamento e validação com Zod
      const tasks: Task[] = data.tasks.map((t: any) =>
        TaskSchema.parse({
          id: t.id,
          title: t.title,
          completed: t.completed,
        }),
      );

      return success(tasks);
    } catch (error) {
      return failure(
        error instanceof Error ? error : new Error('Unknown error'),
      );
    }
  }
}
