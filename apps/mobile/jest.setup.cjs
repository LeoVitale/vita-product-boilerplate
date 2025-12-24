// Jest setup for React Native tests
// This file provides mocks and configurations for React Native components

// Mock Expo modules that are used in the app
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock('expo-linking', () => ({
  createURL: jest.fn((path) => `exp://localhost:8081${path}`),
}));

// Note: React Native components are mocked via moduleNameMapper in jest.config.cjs
// using react-native-web for jsdom compatibility
