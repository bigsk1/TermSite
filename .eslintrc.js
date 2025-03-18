module.exports = {
  plugins: ['prettier'],
  extends: ['next/core-web-vitals'],
  rules: {
    'no-console': 'off',
    'prettier/prettier': 'warn',
    'react-hooks/exhaustive-deps': 'off',
  },
  overrides: [
    {
      // Allow console statements in API and utility files
      files: ['src/utils/api.ts', 'src/utils/bin/crypto_commands.ts'],
      rules: {
        'no-console': 'off',
      }
    }
  ]
};
