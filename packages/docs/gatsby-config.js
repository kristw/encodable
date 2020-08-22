/* eslint-disable no-useless-escape */
// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    'gatsby-theme-docz',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto+Slab\:700`,
          `Roboto\:300,400,400i,700`, // you can also specify font weights and styles
        ],
        display: 'swap',
      },
    },
  ],
};
