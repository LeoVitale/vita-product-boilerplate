module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{apps,packages}/**/*.{js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.{js,jsx}': ['prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.css': ['prettier --write'],
};
