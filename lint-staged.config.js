module.exports = {
  'apps/**/*.{ts,tsx}': (filenames) => {
    const commands = [];
    const byApp = {};
    
    // Filter out prisma config files (they're outside tsconfig scope)
    const filtered = filenames.filter((f) => !f.includes('/prisma/'));
    
    filtered.forEach((filename) => {
      // Remove caminho absoluto se presente
      const relativePath = filename.replace(process.cwd() + '/', '');
      const parts = relativePath.split('/');
      const app = parts[1];
      if (!byApp[app]) {
        byApp[app] = [];
      }
      // Manter apenas o caminho relativo ao app
      byApp[app].push(relativePath.replace(`apps/${app}/`, ''));
    });
    
    Object.keys(byApp).forEach((app) => {
      commands.push(`cd apps/${app} && npx eslint --fix ${byApp[app].join(' ')}`);
    });
    
    return commands;
  },
  'packages/**/*.{ts,tsx}': (filenames) => {
    const commands = [];
    const byPkg = {};
    
    filenames.forEach((filename) => {
      const relativePath = filename.replace(process.cwd() + '/', '');
      const parts = relativePath.split('/');
      const pkg = parts[1];
      if (!byPkg[pkg]) {
        byPkg[pkg] = [];
      }
      byPkg[pkg].push(relativePath.replace(`packages/${pkg}/`, ''));
    });
    
    Object.keys(byPkg).forEach((pkg) => {
      commands.push(`cd packages/${pkg} && npx eslint --fix ${byPkg[pkg].join(' ')}`);
    });
    
    return commands;
  },
  'apps/**/*.{js,jsx}': (filenames) => {
    const commands = [];
    const byApp = {};
    
    filenames.forEach((filename) => {
      const relativePath = filename.replace(process.cwd() + '/', '');
      const parts = relativePath.split('/');
      const app = parts[1];
      if (!byApp[app]) {
        byApp[app] = [];
      }
      byApp[app].push(relativePath.replace(`apps/${app}/`, ''));
    });
    
    Object.keys(byApp).forEach((app) => {
      commands.push(`cd apps/${app} && npx eslint --fix ${byApp[app].join(' ')}`);
    });
    
    return commands;
  },
  'packages/**/*.{js,jsx}': (filenames) => {
    const commands = [];
    const byPkg = {};
    
    filenames.forEach((filename) => {
      const relativePath = filename.replace(process.cwd() + '/', '');
      const parts = relativePath.split('/');
      const pkg = parts[1];
      if (!byPkg[pkg]) {
        byPkg[pkg] = [];
      }
      byPkg[pkg].push(relativePath.replace(`packages/${pkg}/`, ''));
    });
    
    Object.keys(byPkg).forEach((pkg) => {
      commands.push(`cd packages/${pkg} && npx eslint --fix ${byPkg[pkg].join(' ')}`);
    });
    
    return commands;
  },
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.css': ['prettier --write'],
};
