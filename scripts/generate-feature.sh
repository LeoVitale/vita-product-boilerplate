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
 * TODO: Export your entities, repository interfaces, and contracts here
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
 * TODO: Export your use cases, hooks, and factories here
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
 * TODO: Export your repositories, mappers, and hooks here
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
echo "📝 Next steps:"
echo "   1. Add entities to: $DOMAIN_PATH/entities/"
echo "   2. Add repository interface to: $DOMAIN_PATH/repositories/"
echo "   3. Add use cases to: $APP_PATH/use-cases/"
echo "   4. Add hooks to: $APP_PATH/hooks/"
echo "   5. Add repository implementation to: $INFRA_PATH/repositories/"
echo "   6. Update the index.ts files to export your modules"
echo "   7. Wire up in Composition Root: apps/web/src/providers/UseCasesProvider.tsx"
echo ""
echo "📚 See docs/architecture/feature-based.en.md for guidance"

