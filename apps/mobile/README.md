# Mobile App (Expo)

React Native app built with Expo, consuming the shared packages from the monorepo.

## Prerequisites

- Node.js >= 20
- pnpm >= 9
- Expo Go app on your phone (for physical device testing)

## Getting Started

### Install dependencies (from monorepo root)

```bash
pnpm install
```

### Start the development server

```bash
# With tunnel (for physical device testing)
npx expo start --tunnel

# Or standard mode (for simulator)
npx expo start
```

### Configure API endpoint

For physical device testing, create a `.env` file:

```bash
# Get your machine's IP
hostname -I | awk '{print $1}'

# Create .env
echo "EXPO_PUBLIC_API_URL=http://YOUR_IP:4000/graphql" > .env
```

## Project Structure

```text
apps/mobile/
├── App.tsx                    # Entry point with providers
├── src/
│   ├── infrastructure/
│   │   └── graphql/
│   │       └── apollo-client.ts  # Apollo Client configuration
│   ├── providers/
│   │   ├── UseCasesProvider.tsx  # Composition Root
│   │   └── index.ts
│   └── screens/
│       └── TaskListScreen.tsx    # Task list screen
├── metro.config.js            # Metro bundler config for monorepo
├── eslint.config.mjs          # ESLint configuration
└── tsconfig.json              # TypeScript configuration
```

## Shared Packages

This app consumes the following shared packages:

| Package                | Purpose                          |
| ---------------------- | -------------------------------- |
| `@repo/domain`         | Entities, contracts, Result type |
| `@repo/application`    | Use cases and hooks              |
| `@repo/infrastructure` | Apollo repositories              |
| `@repo/graphql`        | Generated GraphQL types          |

## Scripts

```bash
pnpm dev          # Start with tunnel
pnpm start        # Start bundler
pnpm lint         # Run ESLint
pnpm check-types  # TypeScript check
```

## Troubleshooting

### "useContext of null" error

This happens when multiple React instances are bundled. The `metro.config.js` is configured to force a single React instance. Try:

```bash
npx expo start --tunnel --clear
```

### Network request failed

The API endpoint defaults to `localhost:4000`, which doesn't work on physical devices. Configure the `.env` file with your machine's IP address.

### WSL2 networking

If using WSL2, you may need to expose the API port to the Windows host or use ngrok.
