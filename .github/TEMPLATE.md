# 🚀 Template Setup Checklist

Congratulations on creating your new project from **Vita Product Boilerplate**! 🎉

Follow this checklist to personalize your project:

## Required Steps

- [ ] **Update `package.json`**: Change `name` and `description` in root `package.json`
- [ ] **Update `README.md`**: Replace boilerplate content with your project info
- [ ] **Configure environment**: Copy `.env.example` to `.env` and fill values
- [ ] **Delete this file**: Remove `.github/TEMPLATE.md` after setup

## Database Setup

```bash
# Start PostgreSQL with Docker
docker compose up -d

# Run migrations
pnpm --filter api prisma migrate dev
```

## Optional Steps

- [ ] Update `LICENSE` if not using MIT
- [ ] Configure CI/CD secrets in repository settings
- [ ] Update `apps/api/prisma/schema.prisma` with your data models
- [ ] Customize `packages/ui` with your design system

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

## Search & Replace

Find and replace these values across the codebase:

| Find                       | Replace With            |
| -------------------------- | ----------------------- |
| `vita-product-boilerplate` | `your-project-name`     |
| `vita-postgres`            | `your-project-postgres` |
| `vita_db`                  | `your_project_db`       |

## Need Help?

- 📚 [Documentation](./docs/README.en.md)
- 🏗️ [Architecture Guide](./docs/architecture/feature-based.en.md)
- ✨ [Adding Features](./docs/workflows/adding-a-feature.en.md)

---

> **Delete this file** once you've completed the setup! 🗑️
