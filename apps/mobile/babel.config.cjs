module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    // Note: We don't use 'module:metro-react-native-babel-preset' here
    // because we're testing in Node.js environment, not Metro bundler
    // The transformIgnorePatterns in jest.config handles React Native modules
  ],
};
