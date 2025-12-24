# Testing Configuration - React Native

## Current Setup

### Environment
- **Test Environment**: `jsdom` (works well for hooks/providers)
- **Testing Library**: `@testing-library/react` (for hooks) + `@testing-library/react-native` (available for RN components)
- **Jest**: v30.2.0
- **Babel**: Custom config with presets for TypeScript, React, and Node

### Configuration Files

1. **jest.config.cjs**: Main Jest configuration
   - Uses `jsdom` environment (good for hooks/providers)
   - Transforms React Native modules via `transformIgnorePatterns`
   - Maps `react-native` to `react-native-web` for jsdom compatibility
   - Mocks static assets (images, fonts)

2. **babel.config.cjs**: Babel transformation
   - Presets: `@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`
   - Targets Node.js current version

3. **jest.setup.cjs**: Test setup and mocks
   - Mocks Expo modules (`expo-splash-screen`, `expo-linking`)
   - Can be extended for more mocks as needed

## What Works

✅ **Hooks/Providers**: Fully tested with `@testing-library/react`
✅ **Context Providers**: Tested with `renderHook` and wrappers
✅ **Apollo Client**: Works with `ApolloProvider` wrapper
✅ **TypeScript**: Fully supported

## For Testing React Native Components

When you need to test actual React Native components (View, Text, FlatList, etc.):

### Option 1: Use @testing-library/react-native (Recommended)

```typescript
import { render, screen } from '@testing-library/react-native';
import { TasksScreen } from './TasksScreen';

test('renders loading state', () => {
  render(<TasksScreen />);
  expect(screen.getByText('Loading tasks...')).toBeOnTheScreen();
});
```

**Note**: You may need to switch `testEnvironment` to `'react-native'` in `jest.config.cjs` when testing RN components.

### Option 2: Keep jsdom for Simple Components

For simple components that don't use RN-specific APIs, `jsdom` + `react-native-web` mapping works fine.

## Running Tests

```bash
# Run all tests
pnpm --filter @repo/mobile test

# Watch mode
pnpm --filter @repo/mobile test --watch

# Coverage
pnpm --filter @repo/mobile test --coverage
```

## Known Limitations

1. **React Native Environment**: Currently using `jsdom` which is fine for hooks/providers but may need `react-native` environment for complex RN components
2. **Expo Modules**: Some Expo modules may need additional mocks in `jest.setup.cjs`
3. **Native Modules**: Native modules (camera, sensors, etc.) will always need mocks

## Best Practices

1. **Test hooks/providers** with `@testing-library/react` (current setup ✅)
2. **Test RN components** with `@testing-library/react-native` (when needed)
3. **Mock Expo modules** in `jest.setup.cjs`
4. **Use `renderHook`** for custom hooks
5. **Use `render`** for components

## Future Improvements

- [ ] Add `@testing-library/jest-native` for RN-specific matchers
- [ ] Create example test for React Native component (TasksScreen)
- [ ] Add snapshot testing for UI components
- [ ] Configure coverage thresholds

