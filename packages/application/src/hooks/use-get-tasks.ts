import { useState, useEffect, useCallback } from 'react';
import { Task } from '@repo/domain';
import { IGetTasksUseCase } from '../use-cases/get-tasks.use-case';

export function useGetTasks(useCase: IGetTasksUseCase) {
  const [data, setData] = useState<Task[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    
    const result = await useCase.execute();

    if (result.ok) {
      setData(result.value);
    } else {
      setIsError(true);
      setError(result.error);
    }
    setIsLoading(false);
  }, [useCase]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchTasks,
  };
}
