/**
 * TEMPLATE: Test File
 *
 * Use this as reference when creating tests.
 * Demonstrates testing patterns for each layer.
 *
 * Location: Same folder as the file being tested
 * - entity.ts → entity.test.ts
 * - use-case.ts → use-case.test.ts
 */

import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';

// =============================================================================
// Domain Layer Test (Entity Schema)
// =============================================================================

// import { EntityNameSchema, CreateEntityNameInputSchema } from './entity-name';

describe('EntityNameSchema', () => {
  describe('parse', () => {
    it('given_validData_when_parse_then_returnsEntity', () => {
      // Arrange
      const validData = {
        id: '123',
        requiredField: 'Valid Name',
        optionalField: null,
        status: 'active',
        count: 5,
        isEnabled: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      // Act
      const result = EntityNameSchema.safeParse(validData);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe('123');
        expect(result.data.requiredField).toBe('Valid Name');
        expect(result.data.createdAt).toBeInstanceOf(Date);
      }
    });

    it('given_missingRequiredField_when_parse_then_fails', () => {
      // Arrange
      const invalidData = {
        id: '123',
        // requiredField is missing
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      // Act
      const result = EntityNameSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
    });

    it('given_invalidStatus_when_parse_then_fails', () => {
      // Arrange
      const invalidData = {
        id: '123',
        requiredField: 'Valid Name',
        status: 'invalid_status', // Not in enum
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      // Act
      const result = EntityNameSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
    });
  });
});

// =============================================================================
// Application Layer Test (Use Case)
// =============================================================================

// import { GetEntityNamesUseCase } from './get-entity-names.use-case';
// import { EntityNameRepositoryInterface, ok, fail } from '@repo/domain';

describe('GetEntityNamesUseCase', () => {
  let useCase: any; // GetEntityNamesUseCase
  let mockRepository: any; // Mocked EntityNameRepositoryInterface

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      toggleEnabled: vi.fn(),
      bulkDelete: vi.fn(),
      exists: vi.fn(),
    };

    // useCase = new GetEntityNamesUseCase(mockRepository);
  });

  describe('execute', () => {
    it('given_entitiesExist_when_execute_then_returnsEntities', async () => {
      // Arrange
      const mockEntities = [
        { id: '1', requiredField: 'Entity 1' },
        { id: '2', requiredField: 'Entity 2' },
      ];
      mockRepository.findAll.mockResolvedValue({
        ok: true,
        value: mockEntities,
      });

      // Act
      const result = await useCase.execute();

      // Assert
      expect(result.ok).toBe(true);
      expect(result.value).toEqual(mockEntities);
      expect(mockRepository.findAll).toHaveBeenCalledOnce();
    });

    it('given_repositoryFails_when_execute_then_returnsError', async () => {
      // Arrange
      mockRepository.findAll.mockResolvedValue({
        ok: false,
        error: { code: 'NETWORK_ERROR', message: 'Failed to fetch' },
      });

      // Act
      const result = await useCase.execute();

      // Assert
      expect(result.ok).toBe(false);
      expect(result.error.code).toBe('NETWORK_ERROR');
    });
  });
});

// =============================================================================
// Infrastructure Layer Test (Repository)
// =============================================================================

// import { ApolloEntityNameRepository } from './apollo-entity-name.repository';

describe('ApolloEntityNameRepository', () => {
  let repository: any; // ApolloEntityNameRepository
  let mockClient: any; // Mocked Apollo Client

  beforeEach(() => {
    // Create mock Apollo client
    mockClient = {
      query: vi.fn(),
      mutate: vi.fn(),
    };

    // repository = new ApolloEntityNameRepository(mockClient);
  });

  describe('findAll', () => {
    it('given_graphqlSuccess_when_findAll_then_returnsMappedEntities', async () => {
      // Arrange
      const graphqlResponse = {
        data: {
          entityNames: [
            {
              id: '1',
              required_field: 'Entity 1', // snake_case from API
              optional_field: null,
              status: 'ACTIVE', // UPPER_CASE from API
              count: 0,
              is_enabled: true,
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            },
          ],
        },
      };
      mockClient.query.mockResolvedValue(graphqlResponse);

      // Act
      const result = await repository.findAll();

      // Assert
      expect(result.ok).toBe(true);
      expect(result.value).toHaveLength(1);
      expect(result.value[0].requiredField).toBe('Entity 1'); // camelCase in domain
      expect(result.value[0].status).toBe('active'); // lowercase in domain
    });

    it('given_networkError_when_findAll_then_returnsFailure', async () => {
      // Arrange
      mockClient.query.mockRejectedValue(new Error('Network error'));

      // Act
      const result = await repository.findAll();

      // Assert
      expect(result.ok).toBe(false);
      expect(result.error.code).toBe('NETWORK_ERROR');
    });
  });

  describe('create', () => {
    it('given_validInput_when_create_then_returnsCreatedEntity', async () => {
      // Arrange
      const input = { requiredField: 'New Entity' };
      const graphqlResponse = {
        data: {
          createEntityName: {
            id: '1',
            required_field: 'New Entity',
            optional_field: null,
            status: 'PENDING',
            count: 0,
            is_enabled: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
        },
      };
      mockClient.mutate.mockResolvedValue(graphqlResponse);

      // Act
      const result = await repository.create(input);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.value.requiredField).toBe('New Entity');
    });
  });
});

// =============================================================================
// Mapper Test
// =============================================================================

// import { EntityNameMapper } from './entity-name.mapper';

describe('EntityNameMapper', () => {
  describe('toDomain', () => {
    it('given_graphqlData_when_toDomain_then_mapsCorrectly', () => {
      // Arrange
      const graphqlData = {
        id: '1',
        required_field: 'Test',
        optional_field: 'Optional',
        status: 'ACTIVE',
        count: 10,
        is_enabled: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-06-15T12:30:00Z',
      };

      // Act
      // const result = EntityNameMapper.toDomain(graphqlData);

      // Assert
      // expect(result.id).toBe('1');
      // expect(result.requiredField).toBe('Test'); // snake_case → camelCase
      // expect(result.status).toBe('active'); // UPPER → lower
      // expect(result.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('safeToDomain', () => {
    it('given_invalidData_when_safeToDomain_then_returnsNull', () => {
      // Arrange
      const invalidData = {
        id: '1',
        // missing required fields
      };

      // Act
      // const result = EntityNameMapper.safeToDomain(invalidData as any);

      // Assert
      // expect(result).toBeNull();
    });
  });
});

// =============================================================================
// Test Utilities
// =============================================================================

/**
 * Factory for creating test entities
 */
function createTestEntity(overrides = {}) {
  return {
    id: '1',
    requiredField: 'Test Entity',
    optionalField: null,
    status: 'active' as const,
    count: 0,
    isEnabled: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    ...overrides,
  };
}

/**
 * Factory for creating mock repository
 */
function createMockRepository() {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    toggleEnabled: vi.fn(),
    bulkDelete: vi.fn(),
    exists: vi.fn(),
  };
}
