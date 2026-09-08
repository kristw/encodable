const path = require('path');

module.exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        encodable: path.resolve(__dirname, '../../encodable/src'),
        '@encodable/color': path.resolve(__dirname, '../../encodable-color/src'),
        '@encodable/dimension': path.resolve(__dirname, '../../encodable-dimension/src'),
        '@encodable/format': path.resolve(__dirname, '../../encodable-format/src'),
        '@encodable/registry': path.resolve(__dirname, '../../encodable-registry/src'),
      },
    },
  });
};
