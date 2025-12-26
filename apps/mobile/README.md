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

#### Auto-detect IP (Recommended)

The easiest way to configure the API endpoint is to use the auto-detection script:

```bash
pnpm setup:env
```

This will automatically detect your machine's local IP address and update the `.env` file. Perfect for environments with dynamic IPs!

Then start the app:

```bash
pnpm dev
```

The `dev` script automatically runs `setup:env` before starting, so you don't need to run it manually.

#### Manual Configuration

If you prefer to set it manually, create a `.env` file:

**For iOS Simulator (Mac):**

```bash
# .env
EXPO_PUBLIC_API_HOST=localhost
EXPO_PUBLIC_API_PORT=4000
```

**For physical devices or different networks:**

```bash
# .env
EXPO_PUBLIC_API_HOST=192.168.15.7  # Your machine's IP address
EXPO_PUBLIC_API_PORT=4000
```

**For tunnels (ngrok, cloudflared, etc.):**

```bash
# .env
EXPO_PUBLIC_API_URL=https://your-tunnel-url.ngrok.io/graphql
```

#### Multi-Environment Setup

If you work in multiple environments (home, office, etc.):

1. **Auto-detect (recommended)**: Just run `pnpm dev` - it will auto-detect your IP
2. **Environment-specific files**: Create `.env.home`, `.env.office`, etc., and copy the appropriate one to `.env` before starting
3. **Use a tunnel**: Set up a stable tunnel URL that works regardless of your local IP

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
pnpm setup:env    # Auto-detect and configure API host IP (uses shared script)
pnpm dev          # Start with LAN mode (auto-detects IP, then starts Expo)
pnpm dev:tunnel   # Start with tunnel (works anywhere, no network config needed)
pnpm start        # Start bundler (default mode)
pnpm lint         # Run ESLint
pnpm check-types  # TypeScript check
```

**Note**: The `setup:env` script uses the shared script at `scripts/setup-mobile-env.js` in the monorepo root. You can also run it directly:

```bash
# From monorepo root
pnpm scripts:setup-mobile
# Or directly
node scripts/setup-mobile-env.js
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
