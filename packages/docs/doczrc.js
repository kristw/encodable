const docComponents = /docs\/src\/components\/*.tsx?/;

export default {
  typescript: true,
  title: 'Encodable',
  description: 'Configurable grammar for visualization components',
  files: ['src/**/*.{md,markdown,mdx}'],
  menu: [
    'Getting started',
    'Why use Encodable?',
    'Guides',
    'encodable API',
    '@encodable/color',
    '@encodable/format',
    '@encodable/registry',
    'Contributing guidelines',
  ],
  filterComponents: files => files.filter(filepath => docComponents.test(filepath)),
};
