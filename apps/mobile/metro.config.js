const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [monorepoRoot];

// Resolve modules from both the project and monorepo node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Force single copies of React packages to prevent "useContext of null" errors
// This ensures all workspace packages use the same React instance from mobile
const reactPackages = ['react', 'react-native', 'react-dom'];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (reactPackages.includes(moduleName)) {
    return {
      filePath: require.resolve(moduleName, {
        paths: [projectRoot],
      }),
      type: 'sourceFile',
    };
  }
  // Fall back to default resolution
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
