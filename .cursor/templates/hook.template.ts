/**
 * TEMPLATE: Application Hook
 *
 * Use this as reference when creating React hooks.
 * Copy and replace [EntityName] with your entity name.
 *
 * Location: packages/application/src/features/[feature-name]/hooks/use-[entities].ts
 * Or: packages/infrastructure/src/features/[feature-name]/hooks/use-[entities].ts
 */

import { useState, useCallback, useEffect } from 'react';
import {
  EntityName,
  EntityNameRepositoryInterface,
  CreateEntityNameInput,
} from '@repo/domain';

// =============================================================================
// Types
// =============================================================================

interface UseEntityNamesResult {
  /** List of entities, null if not yet loaded */
  data: EntityName[] | null;
  /** True while loading data */
  isLoading: boolean;
  /** True if an error occurred */
  isError: boolean;
  /** Error object if isError is true */
  error: Error | null;
  /** Function to manually refetch data */
  refetch: () => Promise<void>;
}

interface UseCreateEntityNameResult {
  /** Function to create a new entity */
  create: (input: CreateEntityNameInput) => Promise<boolean>;
  /** True while mutation is in progress */
  isLoading: boolean;
  /** True if mutation failed */
  isError: boolean;
  /** Error object if isError is true */
  error: Error | null;
  /** Last created entity, if successful */
  data: EntityName | null;
}

// =============================================================================
// Query Hook
// =============================================================================

/**
 * Hook for fetching all [entities]
 *
 * Accepts repository via parameter for Dependency Inversion.
 * Manages loading, error, and data states.
 *
 * @param repository - EntityName repository implementation
 * @returns Standard query result object
 *
 * @example
 * ```tsx
 * const { data, isLoading, refetch } = useEntityNames(repository);
 * ```
 */
export function useEntityNames(
  repository: EntityNameRepositoryInterface,
): UseEntityNamesResult {
  const [data, setData] = useState<EntityName[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await repository.findAll();

      if (result.ok) {
        setData(result.value);
      } else {
        setError(new Error(result.error.message));
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [repository]);

  // Fetch on mount
  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    isLoading,
    isError: error !== null,
    error,
    refetch: fetch,
  };
}

// =============================================================================
// Mutation Hook
// =============================================================================

/**
 * Hook for creating a new [entity]
 *
 * Provides a create function and tracks mutation state.
 *
 * @param repository - EntityName repository implementation
 * @param onSuccess - Optional callback after successful creation
 * @returns Mutation state and create function
 *
 * @example
 * ```tsx
 * const { create, isLoading } = useCreateEntityName(repository, () => refetch());
 *
 * const handleSubmit = async (input) => {
 *   const success = await create(input);
 *   if (success) showToast('Created!');
 * };
 * ```
 */
export function useCreateEntityName(
  repository: EntityNameRepositoryInterface,
  onSuccess?: (entity: EntityName) => void,
): UseCreateEntityNameResult {
  const [data, setData] = useState<EntityName | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(
    async (input: CreateEntityNameInput): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await repository.create(input);

        if (result.ok) {
          setData(result.value);
          onSuccess?.(result.value);
          return true;
        } else {
          setError(new Error(result.error.message));
          return false;
        }
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Unknown error'));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [repository, onSuccess],
  );

  return {
    create,
    isLoading,
    isError: error !== null,
    error,
    data,
  };
}

// =============================================================================
// Combined Hook (Query + Mutations)
// =============================================================================

interface UseEntityNamesCRUDResult extends UseEntityNamesResult {
  /** Create a new entity */
  create: (input: CreateEntityNameInput) => Promise<boolean>;
  /** Delete an entity by ID */
  deleteEntity: (id: string) => Promise<boolean>;
  /** Toggle enabled status */
  toggleEnabled: (id: string) => Promise<boolean>;
  /** True if any mutation is in progress */
  isMutating: boolean;
}

/**
 * Combined hook for all [entity] operations
 *
 * Provides query and all mutation operations in one hook.
 * Automatically refetches after successful mutations.
 *
 * @param repository - EntityName repository implementation
 * @returns Query result and mutation functions
 */
export function useEntityNamesCRUD(
  repository: EntityNameRepositoryInterface,
): UseEntityNamesCRUDResult {
  const { data, isLoading, isError, error, refetch } =
    useEntityNames(repository);
  const [isMutating, setIsMutating] = useState(false);

  const create = useCallback(
    async (input: CreateEntityNameInput): Promise<boolean> => {
      setIsMutating(true);
      try {
        const result = await repository.create(input);
        if (result.ok) {
          await refetch();
          return true;
        }
        return false;
      } finally {
        setIsMutating(false);
      }
    },
    [repository, refetch],
  );

  const deleteEntity = useCallback(
    async (id: string): Promise<boolean> => {
      setIsMutating(true);
      try {
        const result = await repository.delete(id);
        if (result.ok) {
          await refetch();
          return true;
        }
        return false;
      } finally {
        setIsMutating(false);
      }
    },
    [repository, refetch],
  );

  const toggleEnabled = useCallback(
    async (id: string): Promise<boolean> => {
      setIsMutating(true);
      try {
        const result = await repository.toggleEnabled(id);
        if (result.ok) {
          await refetch();
          return true;
        }
        return false;
      } finally {
        setIsMutating(false);
      }
    },
    [repository, refetch],
  );

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    create,
    deleteEntity,
    toggleEnabled,
    isMutating,
  };
}
