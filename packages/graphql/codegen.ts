import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../apps/api/src/schema.gql',
  documents: 'src/**/*.graphql',
  generates: {
    './src/generated/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      config: {
        scalars: {
          ID: 'string',
        },
        enumsAsTypes: true,
        dedupeFragments: true,
        nonOptionalTypename: false,
        documentMode: 'documentNode',
      },
    },
  },
};

export default config;
