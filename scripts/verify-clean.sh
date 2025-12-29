#!/bin/bash

# =============================================================================
# Verify Clean State Script
# =============================================================================
# Usage: ./scripts/verify-clean.sh
#
# This script verifies that the example "Tasks" feature has been completely
# removed from the boilerplate.
#
# Run this after clean-example.sh and manual cleanup steps.
# =============================================================================

set -e

echo ""
echo "🔍 ============================================================"
echo "   VERIFYING CLEAN STATE"
echo "   ============================================================"
echo ""

ERRORS=0
WARNINGS=0

# Check if tasks directories still exist
echo "📁 Checking for Tasks directories..."

if [ -d "packages/domain/src/features/tasks" ]; then
    echo "   ❌ Found: packages/domain/src/features/tasks"
    ((ERRORS++))
else
    echo "   ✅ Clean: packages/domain/src/features/tasks"
fi

if [ -d "packages/application/src/features/tasks" ]; then
    echo "   ❌ Found: packages/application/src/features/tasks"
    ((ERRORS++))
else
    echo "   ✅ Clean: packages/application/src/features/tasks"
fi

if [ -d "packages/infrastructure/src/features/tasks" ]; then
    echo "   ❌ Found: packages/infrastructure/src/features/tasks"
    ((ERRORS++))
else
    echo "   ✅ Clean: packages/infrastructure/src/features/tasks"
fi

if [ -d "apps/api/src/tasks" ]; then
    echo "   ❌ Found: apps/api/src/tasks"
    ((ERRORS++))
else
    echo "   ✅ Clean: apps/api/src/tasks"
fi

echo ""
echo "📄 Checking for Tasks files..."

if [ -f "packages/graphql/src/queries/tasks.graphql" ]; then
    echo "   ❌ Found: packages/graphql/src/queries/tasks.graphql"
    ((ERRORS++))
else
    echo "   ✅ Clean: packages/graphql/src/queries/tasks.graphql"
fi

if [ -f "packages/graphql/src/mutations/tasks.graphql" ]; then
    echo "   ❌ Found: packages/graphql/src/mutations/tasks.graphql"
    ((ERRORS++))
else
    echo "   ✅ Clean: packages/graphql/src/mutations/tasks.graphql"
fi

echo ""
echo "🔎 Checking for 'tasks' references in exports..."

# Check index.ts files for tasks exports
if grep -q "tasks" packages/domain/src/index.ts 2>/dev/null; then
    echo "   ❌ Found 'tasks' reference in: packages/domain/src/index.ts"
    ((ERRORS++))
else
    echo "   ✅ Clean: packages/domain/src/index.ts"
fi

if grep -q "tasks" packages/application/src/index.ts 2>/dev/null; then
    echo "   ❌ Found 'tasks' reference in: packages/application/src/index.ts"
    ((ERRORS++))
else
    echo "   ✅ Clean: packages/application/src/index.ts"
fi

if grep -q "tasks" packages/infrastructure/src/index.ts 2>/dev/null; then
    echo "   ❌ Found 'tasks' reference in: packages/infrastructure/src/index.ts"
    ((ERRORS++))
else
    echo "   ✅ Clean: packages/infrastructure/src/index.ts"
fi

echo ""
echo "🔧 Checking API module..."

if grep -q "TasksModule" apps/api/src/app.module.ts 2>/dev/null; then
    echo "   ❌ Found 'TasksModule' in: apps/api/src/app.module.ts"
    ((ERRORS++))
else
    echo "   ✅ Clean: apps/api/src/app.module.ts"
fi

echo ""
echo "📊 Checking Prisma schema..."

if grep -q "model Task" apps/api/prisma/schema.prisma 2>/dev/null; then
    echo "   ⚠️  Found 'Task' model in: apps/api/prisma/schema.prisma"
    echo "      (Remove it and run a migration)"
    ((WARNINGS++))
else
    echo "   ✅ Clean: apps/api/prisma/schema.prisma"
fi

echo ""
echo "🌐 Checking Composition Roots..."

if grep -q "Task" apps/web/src/providers/UseCasesProvider.tsx 2>/dev/null; then
    echo "   ⚠️  Found 'Task' references in: apps/web/src/providers/UseCasesProvider.tsx"
    ((WARNINGS++))
else
    echo "   ✅ Clean: apps/web/src/providers/UseCasesProvider.tsx"
fi

if grep -q "Task" apps/mobile/src/providers/UseCasesProvider.tsx 2>/dev/null; then
    echo "   ⚠️  Found 'Task' references in: apps/mobile/src/providers/UseCasesProvider.tsx"
    ((WARNINGS++))
else
    echo "   ✅ Clean: apps/mobile/src/providers/UseCasesProvider.tsx"
fi

echo ""
echo "============================================================"

if [ $ERRORS -gt 0 ]; then
    echo "❌ VERIFICATION FAILED"
    echo ""
    echo "   Found $ERRORS error(s) and $WARNINGS warning(s)"
    echo ""
    echo "   Please run: ./scripts/clean-example.sh"
    echo "   And complete the manual steps listed."
    echo ""
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo "⚠️  VERIFICATION PASSED WITH WARNINGS"
    echo ""
    echo "   Found $WARNINGS warning(s)"
    echo ""
    echo "   The example feature directories are removed, but some"
    echo "   manual cleanup may still be needed."
    echo ""
    echo "   See: docs/getting-started/clean-slate.en.md"
    echo ""
    exit 0
else
    echo "✅ VERIFICATION PASSED"
    echo ""
    echo "   Your boilerplate is clean and ready for new features!"
    echo ""
    echo "   Next steps:"
    echo "   1. Generate your first feature:"
    echo "      ./scripts/generate-feature.sh my-feature"
    echo ""
    echo "   2. Start development:"
    echo "      pnpm dev"
    echo ""
    exit 0
fi

