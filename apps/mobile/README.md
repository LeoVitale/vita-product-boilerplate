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

Create a `.env` file based on your environment:

#### WSL2 with mirrored networking

```bash
# .env
EXPO_PUBLIC_API_HOST=192.168.15.8    # Your Windows IP on the network
EXPO_PUBLIC_API_PORT=4000
```

Then run with your host IP:

```bash
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.15.8 pnpm dev
```

**Note**: You need to configure Windows Firewall to allow ports 4000 and 8081:

```powershell
netsh advfirewall firewall add rule name="WSL API" dir=in action=allow protocol=TCP localport=4000
netsh advfirewall firewall add rule name="WSL Expo" dir=in action=allow protocol=TCP localport=8081
```

#### Mac (local development)

```bash
# .env
EXPO_PUBLIC_API_HOST=localhost
EXPO_PUBLIC_API_PORT=4000
```

Then simply run:

```bash
pnpm dev
```

#### Environment Variables Reference

| Variable                         | Description                        | Default     |
| -------------------------------- | ---------------------------------- | ----------- |
| `EXPO_METRO_PORT`                | Metro bundler port                 | `8081`      |
| `EXPO_PUBLIC_API_HOST`           | GraphQL API host                   | `localhost` |
| `EXPO_PUBLIC_API_PORT`           | GraphQL API port                   | `4000`      |
| `EXPO_PUBLIC_API_URL`            | Full API URL (overrides host/port) | -           |
| `REACT_NATIVE_PACKAGER_HOSTNAME` | Host announced by Metro bundler    | auto-detect |

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
pnpm dev          # Start with LAN mode (for local network testing)
pnpm dev:tunnel   # Start with tunnel (works anywhere, no network config needed)
pnpm start        # Start bundler (default mode)
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

If using WSL2 with **mirrored networking**:

1. Configure `.wslconfig` in `C:\Users\YOUR_USER\.wslconfig`:

```ini
[wsl2]
networkingMode=mirrored
```

2. Restart WSL: `wsl --shutdown`

3. Add Windows Firewall rules (PowerShell as Admin):

```powershell
netsh advfirewall firewall add rule name="WSL API" dir=in action=allow protocol=TCP localport=4000
netsh advfirewall firewall add rule name="WSL Expo" dir=in action=allow protocol=TCP localport=8081
```

4. Set your `.env` with your network IP and run with `REACT_NATIVE_PACKAGER_HOSTNAME`.

**Alternative**: Use `pnpm dev:tunnel` which works without any network configuration.
