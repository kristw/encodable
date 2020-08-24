// const docComponents = /docs\/src\/components(\/.+)+\.tsx?/;

export default {
  typescript: true,
  title: '<.> Encodable',
  description: 'Configurable grammar for visualization components',
  repository: 'https://github.com/kristw/encodable',
  codeSandbox: true,
  src: './src',
  files: ['src/**/*.{md,markdown,mdx}'],
  propsParser: false,
  menu: [
    'Getting started',
    'Why use Encodable?',
    { name: 'Gallery', menu: ['Gallery'] },
    'Guides',
    'Encodable API',
    '@encodable/color',
    '@encodable/format',
    '@encodable/registry',
    'Contributing guidelines',
  ],
  filterComponents: files => files.filter(() => false),
};
