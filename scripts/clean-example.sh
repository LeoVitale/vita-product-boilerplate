#!/bin/bash

# =============================================================================
# Clean Example Feature Script
# =============================================================================
# Usage: ./scripts/clean-example.sh
#
# This script removes the example "Tasks" feature from all layers of the
# boilerplate, allowing you to start fresh with your own features.
#
# The Tasks feature is EDUCATIONAL ONLY - it demonstrates how to implement
# Clean Architecture patterns. Remove it before building your product.
# =============================================================================

set -e

echo ""
echo "🧹 ============================================================"
echo "   REMOVING EXAMPLE 'TASKS' FEATURE"
echo "   ============================================================"
echo ""
echo "   This will remove all Tasks-related code from:"
echo "   - Domain layer (entities, repositories, contracts)"
echo "   - Application layer (use cases, hooks, factories)"
echo "   - Infrastructure layer (Apollo repos, mappers, hooks)"
echo "   - GraphQL operations"
echo "   - Backend API module"
echo ""

# Confirm before proceeding
read -p "   Continue? (y/N) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted."
    exit 1
fi

echo ""
echo "📁 Removing feature directories..."

# Domain Layer
if [ -d "packages/domain/src/features/tasks" ]; then
    rm -rf packages/domain/src/features/tasks
    echo "   ✅ Removed: packages/domain/src/features/tasks"
else
    echo "   ⏭️  Skipped: packages/domain/src/features/tasks (not found)"
fi

# Application Layer
if [ -d "packages/application/src/features/tasks" ]; then
    rm -rf packages/application/src/features/tasks
    echo "   ✅ Removed: packages/application/src/features/tasks"
else
    echo "   ⏭️  Skipped: packages/application/src/features/tasks (not found)"
fi

# Infrastructure Layer
if [ -d "packages/infrastructure/src/features/tasks" ]; then
    rm -rf packages/infrastructure/src/features/tasks
    echo "   ✅ Removed: packages/infrastructure/src/features/tasks"
else
    echo "   ⏭️  Skipped: packages/infrastructure/src/features/tasks (not found)"
fi

echo ""
echo "📄 Removing GraphQL operations..."

# GraphQL Queries
if [ -f "packages/graphql/src/queries/tasks.graphql" ]; then
    rm -f packages/graphql/src/queries/tasks.graphql
    echo "   ✅ Removed: packages/graphql/src/queries/tasks.graphql"
else
    echo "   ⏭️  Skipped: packages/graphql/src/queries/tasks.graphql (not found)"
fi

# GraphQL Mutations
if [ -f "packages/graphql/src/mutations/tasks.graphql" ]; then
    rm -f packages/graphql/src/mutations/tasks.graphql
    echo "   ✅ Removed: packages/graphql/src/mutations/tasks.graphql"
else
    echo "   ⏭️  Skipped: packages/graphql/src/mutations/tasks.graphql (not found)"
fi

echo ""
echo "🔧 Removing backend Tasks module..."

# API Tasks Module
if [ -d "apps/api/src/tasks" ]; then
    rm -rf apps/api/src/tasks
    echo "   ✅ Removed: apps/api/src/tasks"
else
    echo "   ⏭️  Skipped: apps/api/src/tasks (not found)"
fi

# API Scripts
if [ -f "apps/api/scripts/seed-tasks.ts" ]; then
    rm -f apps/api/scripts/seed-tasks.ts
    echo "   ✅ Removed: apps/api/scripts/seed-tasks.ts"
else
    echo "   ⏭️  Skipped: apps/api/scripts/seed-tasks.ts (not found)"
fi

if [ -f "apps/api/scripts/list-tasks.ts" ]; then
    rm -f apps/api/scripts/list-tasks.ts
    echo "   ✅ Removed: apps/api/scripts/list-tasks.ts"
else
    echo "   ⏭️  Skipped: apps/api/scripts/list-tasks.ts (not found)"
fi

echo ""
echo "📝 Cleaning package exports..."

# Clean domain/src/index.ts
if [ -f "packages/domain/src/index.ts" ]; then
    # Remove the tasks export line
    sed -i "/export \* from '.\/features\/tasks'/d" packages/domain/src/index.ts
    # Remove example feature comments
    sed -i '/EXAMPLE FEATURE/d' packages/domain/src/index.ts
    sed -i "/The 'tasks' feature demonstrates/d" packages/domain/src/index.ts
    sed -i '/Remove before starting your project/d' packages/domain/src/index.ts
    sed -i '/^\/\/ ===.*===$/d' packages/domain/src/index.ts
    echo "   ✅ Cleaned: packages/domain/src/index.ts"
fi

# Clean application/src/index.ts
if [ -f "packages/application/src/index.ts" ]; then
    sed -i "/export \* from '.\/features\/tasks'/d" packages/application/src/index.ts
    sed -i '/EXAMPLE FEATURE/d' packages/application/src/index.ts
    sed -i "/The 'tasks' feature demonstrates/d" packages/application/src/index.ts
    sed -i '/Remove before starting your project/d' packages/application/src/index.ts
    sed -i '/^\/\/ ===.*===$/d' packages/application/src/index.ts
    echo "   ✅ Cleaned: packages/application/src/index.ts"
fi

# Clean infrastructure/src/index.ts
if [ -f "packages/infrastructure/src/index.ts" ]; then
    sed -i "/export \* from '.\/features\/tasks'/d" packages/infrastructure/src/index.ts
    sed -i '/EXAMPLE FEATURE/d' packages/infrastructure/src/index.ts
    sed -i "/The 'tasks' feature demonstrates/d" packages/infrastructure/src/index.ts
    sed -i '/Remove before starting your project/d' packages/infrastructure/src/index.ts
    sed -i '/^\/\/ ===.*===$/d' packages/infrastructure/src/index.ts
    echo "   ✅ Cleaned: packages/infrastructure/src/index.ts"
fi

echo ""
echo "============================================================"
echo "✅ AUTOMATIC CLEANUP COMPLETE!"
echo "============================================================"
echo ""
echo "📝 MANUAL STEPS REQUIRED:"
echo ""
echo "   1. PRISMA SCHEMA"
echo "      Edit: apps/api/prisma/schema.prisma"
echo "      - Remove the 'Task' model"
echo "      - Run: pnpm --filter api prisma migrate dev --name remove_tasks"
echo ""
echo "   2. API MODULE"
echo "      Edit: apps/api/src/app.module.ts"
echo "      - Remove: import { TasksModule } from './tasks/tasks.module';"
echo "      - Remove: TasksModule from imports array"
echo ""
echo "   3. WEB COMPOSITION ROOT"
echo "      Edit: apps/web/src/providers/UseCasesProvider.tsx"
echo "      - Remove all Tasks-related imports"
echo "      - Remove Tasks providers and use cases"
echo "      - Or replace with a minimal empty provider"
echo ""
echo "   4. MOBILE COMPOSITION ROOT"
echo "      Edit: apps/mobile/src/providers/UseCasesProvider.tsx"
echo "      - Remove all Tasks-related imports"
echo "      - Remove Tasks providers and use cases"
echo ""
echo "   5. WEB UI"
echo "      Edit: apps/web/app/page.tsx"
echo "      - Replace with your landing page content"
echo ""
echo "   6. MOBILE UI"
echo "      Edit: apps/mobile/src/screens/TaskListScreen.tsx"
echo "      - Remove or replace with your screen"
echo ""
echo "   7. REGENERATE GRAPHQL"
echo "      Run: pnpm generate"
echo ""
echo "============================================================"
echo "🚀 NEXT STEPS:"
echo "============================================================"
echo ""
echo "   After completing manual steps:"
echo ""
echo "   1. Verify clean state:"
echo "      ./scripts/verify-clean.sh"
echo ""
echo "   2. Generate your first feature:"
echo "      ./scripts/generate-feature.sh my-feature"
echo ""
echo "   3. Start building!"
echo "      pnpm dev"
echo ""
echo "   📚 See: docs/getting-started/clean-slate.en.md"
echo ""

