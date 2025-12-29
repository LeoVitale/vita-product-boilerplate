#!/bin/bash

# =============================================================================
# Feature Generator Script
# =============================================================================
# Usage: ./scripts/generate-feature.sh <feature-name>
# Example: ./scripts/generate-feature.sh auth
#
# This script creates the folder structure for a new feature across all layers:
# - domain/src/features/<feature>/
# - application/src/features/<feature>/
# - infrastructure/src/features/<feature>/
# =============================================================================

set -e

if [ -z "$1" ]; then
  echo "❌ Error: Feature name required"
  echo "Usage: ./scripts/generate-feature.sh <feature-name>"
  echo "Example: ./scripts/generate-feature.sh auth"
  exit 1
fi

FEATURE_NAME_LOWER="$1"
FEATURE_NAME_PASCAL="$(echo "$1" | sed -r 's/(^|-)([a-z])/\U\2/g')"

# =============================================================================
# Check for example feature
# =============================================================================
if [ -d "packages/domain/src/features/tasks" ]; then
  echo ""
  echo "⚠️  ============================================================"
  echo "   EXAMPLE FEATURE DETECTED"
  echo "   ============================================================"
  echo ""
  echo "   The example 'tasks' feature is still present in the codebase."
  echo "   This feature is for educational purposes only."
  echo ""
  echo "   Options:"
  echo "   1. Remove the example first: pnpm clean:example"
  echo "   2. Continue anyway (the example will remain)"
  echo ""
  echo "   📚 See: docs/getting-started/clean-slate.en.md"
  echo ""
  read -p "   Continue generating '$FEATURE_NAME_LOWER' feature? (y/N) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "   Aborted. Run 'pnpm clean:example' first, then try again."
    exit 0
  fi
  echo ""
fi

echo "🚀 Generating feature: $FEATURE_NAME_LOWER (${FEATURE_NAME_PASCAL})"

# Domain Layer
DOMAIN_PATH="packages/domain/src/features/$FEATURE_NAME_LOWER"
echo "📁 Creating domain layer: $DOMAIN_PATH"
mkdir -p "$DOMAIN_PATH/entities"
mkdir -p "$DOMAIN_PATH/repositories"
mkdir -p "$DOMAIN_PATH/contracts"

# Create domain files with placeholders
cat > "$DOMAIN_PATH/entities/.gitkeep" << EOF
EOF

cat > "$DOMAIN_PATH/repositories/.gitkeep" << EOF
EOF

cat > "$DOMAIN_PATH/contracts/.gitkeep" << EOF
EOF

cat > "$DOMAIN_PATH/index.ts" << EOF
/**
 * ${FEATURE_NAME_PASCAL} Feature - Domain Public API
 *
 * Export your entities, repository interfaces, and contracts here.
 */

// Entities
// export * from './entities';

// Repository Interface
// export type { ${FEATURE_NAME_PASCAL}RepositoryInterface } from './repositories';

// Contracts
// export * from './contracts';
EOF

# Application Layer
APP_PATH="packages/application/src/features/$FEATURE_NAME_LOWER"
echo "📁 Creating application layer: $APP_PATH"
mkdir -p "$APP_PATH/use-cases"
mkdir -p "$APP_PATH/hooks"
mkdir -p "$APP_PATH/factories"

cat > "$APP_PATH/use-cases/.gitkeep" << EOF
EOF

cat > "$APP_PATH/hooks/.gitkeep" << EOF
EOF

cat > "$APP_PATH/factories/.gitkeep" << EOF
EOF

cat > "$APP_PATH/index.ts" << EOF
/**
 * ${FEATURE_NAME_PASCAL} Feature - Application Public API
 *
 * Export your use cases, hooks, and factories here.
 */

// Use Cases
// export * from './use-cases';

// Hooks
// export * from './hooks';

// Factories
// export * from './factories';
EOF

# Infrastructure Layer
INFRA_PATH="packages/infrastructure/src/features/$FEATURE_NAME_LOWER"
echo "📁 Creating infrastructure layer: $INFRA_PATH"
mkdir -p "$INFRA_PATH/repositories"
mkdir -p "$INFRA_PATH/mappers"
mkdir -p "$INFRA_PATH/hooks"

cat > "$INFRA_PATH/repositories/.gitkeep" << EOF
EOF

cat > "$INFRA_PATH/mappers/.gitkeep" << EOF
EOF

cat > "$INFRA_PATH/hooks/.gitkeep" << EOF
EOF

cat > "$INFRA_PATH/index.ts" << EOF
/**
 * ${FEATURE_NAME_PASCAL} Feature - Infrastructure Public API
 *
 * Export your repositories, mappers, and hooks here.
 */

// Repositories
// export * from './repositories';

// Mappers
// export * from './mappers';

// Hooks
// export * from './hooks';
EOF

echo ""
echo "✅ Feature '$FEATURE_NAME_LOWER' created successfully!"
echo ""
echo "============================================================"
echo "📝 NEXT STEPS"
echo "============================================================"
echo ""
echo "   1. DOMAIN LAYER ($DOMAIN_PATH/)"
echo "      - Create entity: entities/${FEATURE_NAME_LOWER}.ts"
echo "      - Create repository interface: repositories/${FEATURE_NAME_LOWER}-repository.interface.ts"
echo "      - Create hook contracts: contracts/${FEATURE_NAME_LOWER}-query.interface.ts"
echo ""
echo "   2. APPLICATION LAYER ($APP_PATH/)"
echo "      - Create use cases: use-cases/get-${FEATURE_NAME_LOWER}.use-case.ts"
echo "      - Create hooks: hooks/use-get-${FEATURE_NAME_LOWER}.ts"
echo "      - Create factory: factories/use-cases.factory.ts"
echo ""
echo "   3. INFRASTRUCTURE LAYER ($INFRA_PATH/)"
echo "      - Create mapper: mappers/${FEATURE_NAME_LOWER}.mapper.ts"
echo "      - Create Apollo repository: repositories/apollo-${FEATURE_NAME_LOWER}-repository.ts"
echo "      - Create Apollo hooks: hooks/use-apollo-${FEATURE_NAME_LOWER}-query.ts"
echo ""
echo "   4. GRAPHQL (packages/graphql/)"
echo "      - Create query: src/queries/${FEATURE_NAME_LOWER}.graphql"
echo "      - Run: pnpm generate"
echo ""
echo "   5. BACKEND (apps/api/)"
echo "      - Create module, resolver, service as needed"
echo ""
echo "   6. UPDATE EXPORTS"
echo "      - packages/domain/src/index.ts"
echo "      - packages/application/src/index.ts"
echo "      - packages/infrastructure/src/index.ts"
echo ""
echo "   7. WIRE IN COMPOSITION ROOT"
echo "      - apps/web/src/providers/UseCasesProvider.tsx"
echo "      - apps/mobile/src/providers/UseCasesProvider.tsx"
echo ""
echo "============================================================"
echo "📚 REFERENCE"
echo "============================================================"
echo ""

# Check if tasks example exists for reference
if [ -d "packages/domain/src/features/tasks" ]; then
  echo "   The 'tasks' example feature is available for reference:"
  echo "   - packages/domain/src/features/tasks/"
  echo "   - packages/application/src/features/tasks/"
  echo "   - packages/infrastructure/src/features/tasks/"
  echo ""
fi

echo "   Documentation:"
echo "   - docs/architecture/feature-based.en.md"
echo "   - docs/workflows/adding-a-feature.en.md"
echo ""
