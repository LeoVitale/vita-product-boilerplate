module.exports = {
  'apps/**/*.{ts,tsx}': (filenames) => {
    // Filter out prisma config files (they're outside tsconfig scope)
    const filtered = filenames.filter((f) => !f.includes('/prisma/'));
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

    return Object.entries(byApp).map(
      ([app, files]) =>
        `eslint --fix --config apps/${app}/eslint.config.mjs ${files.join(' ')}`,
    );
  },
  'packages/**/*.{ts,tsx}': (filenames) => {
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

    return Object.entries(byPkg).map(
      ([pkg, files]) =>
        `eslint --fix --config packages/${pkg}/eslint.config.mjs ${files.join(' ')}`,
    );
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

    return Object.entries(byApp).map(
      ([app, files]) =>
        `eslint --fix --config apps/${app}/eslint.config.mjs ${files.join(' ')}`,
    );
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

    return Object.entries(byPkg).map(
      ([pkg, files]) =>
        `eslint --fix --config packages/${pkg}/eslint.config.mjs ${files.join(' ')}`,
    );
  },
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.css': ['prettier --write'],
};
