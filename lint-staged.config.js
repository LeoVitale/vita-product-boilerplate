const fs = require('fs');
const path = require('path');

// Helper to find eslint config file (supports both .mjs and .js)
function findEslintConfig(dir) {
  const mjsPath = path.join(dir, 'eslint.config.mjs');
  const jsPath = path.join(dir, 'eslint.config.js');
  if (fs.existsSync(mjsPath)) return mjsPath;
  if (fs.existsSync(jsPath)) return jsPath;
  return null;
}

module.exports = {
  'apps/**/*.{ts,tsx}': (filenames) => {
    // Filter out prisma config files (they're outside tsconfig scope)
    const filtered = filenames.filter(
      (f) => !f.includes('/prisma/') && !f.includes('prisma.config.ts'),
    );
    if (filtered.length === 0) return [];

    // Group files by app to run eslint with correct config
    const byApp = {};
    filtered.forEach((f) => {
      const match = f.match(/apps\/([^/]+)/);
      if (match) {
        const app = match[1];
        if (!byApp[app]) byApp[app] = [];
        byApp[app].push(f);
      }
    });

    return Object.entries(byApp)
      .map(([app, files]) => {
        const configPath = findEslintConfig(`apps/${app}`);
        if (!configPath) return null;
        return `eslint --fix --config ${configPath} ${files.join(' ')}`;
      })
      .filter(Boolean);
  },
  'packages/**/*.{ts,tsx}': (filenames) => {
    // Filter out generated files (they don't need linting)
    const filtered = filenames.filter((f) => !f.includes('/generated/'));
    if (filtered.length === 0) return [];

    const byPkg = {};
    filtered.forEach((f) => {
      const match = f.match(/packages\/([^/]+)/);
      if (match) {
        const pkg = match[1];
        if (!byPkg[pkg]) byPkg[pkg] = [];
        byPkg[pkg].push(f);
      }
    });

    // Only run eslint for packages that have eslint config
    return Object.entries(byPkg)
      .map(([pkg, files]) => {
        const configPath = findEslintConfig(`packages/${pkg}`);
        if (!configPath) return null;
        return `eslint --fix --config ${configPath} ${files.join(' ')}`;
      })
      .filter(Boolean);
  },
  'apps/**/*.{js,jsx}': (filenames) => {
    if (filenames.length === 0) return [];

    const byApp = {};
    filenames.forEach((f) => {
      const match = f.match(/apps\/([^/]+)/);
      if (match) {
        const app = match[1];
        if (!byApp[app]) byApp[app] = [];
        byApp[app].push(f);
      }
    });

    return Object.entries(byApp)
      .map(([app, files]) => {
        const configPath = findEslintConfig(`apps/${app}`);
        if (!configPath) return null;
        return `eslint --fix --config ${configPath} ${files.join(' ')}`;
      })
      .filter(Boolean);
  },
  'packages/**/*.{js,jsx}': (filenames) => {
    if (filenames.length === 0) return [];

    const byPkg = {};
    filenames.forEach((f) => {
      const match = f.match(/packages\/([^/]+)/);
      if (match) {
        const pkg = match[1];
        if (!byPkg[pkg]) byPkg[pkg] = [];
        byPkg[pkg].push(f);
      }
    });

    return Object.entries(byPkg)
      .map(([pkg, files]) => {
        const configPath = findEslintConfig(`packages/${pkg}`);
        if (!configPath) return null;
        return `eslint --fix --config ${configPath} ${files.join(' ')}`;
      })
      .filter(Boolean);
  },
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.css': ['prettier --write'],
};
