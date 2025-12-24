module.exports = {
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/*.test.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Use jsdom for hooks/providers (works well)
  // For React Native components, consider using @testing-library/react-native with react-native environment
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock React Native components for jsdom environment
    '^react-native$': '<rootDir>/node_modules/react-native-web',
    // Mock static assets (images, fonts, etc.)
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
  },
  // Setup files for React Native mocks
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
};
