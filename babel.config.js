// eslint-disable-next-line no-undef, import/no-extraneous-dependencies
const { getConfig } = require('@airbnb/config-babel');

const config = getConfig({
  library: true,
  react: true,
  next: true,
  node: process.env.NODE_ENV === 'test',
  typescript: true,
  env: {
    targets: false,
  },
});

const index = config.plugins.indexOf('@babel/plugin-proposal-class-properties');
if (index >= 0) {
  config.plugins.splice(index, 1, ['@babel/plugin-proposal-class-properties', { loose: true }]);
}

// Override to allow transpile es modules inside vega-lite
config.ignore = config.ignore.filter(item => item !== 'node_modules/');
config.ignore.push('node_modules/(?!(vega-lite|lodash-es))');

// eslint-disable-next-line no-undef
module.exports = config;
