module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation
        'style', // Formatting (no code change)
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Tests
        'build', // Build and dependencies
        'ci', // CI/CD
        'chore', // Other changes
        'revert', // Revert commit
      ],
    ],
    'subject-max-length': [2, 'always', 50],
    'body-max-line-length': [2, 'always', 72],
  },
};
