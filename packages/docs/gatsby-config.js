function getFonts(typography) {
  return typography.googleFonts.map(
    // eslint-disable-next-line no-useless-escape
    ({ name, styles: fontStyles }) => `${name.replace(/ /gi, '+')}\:${fontStyles.join(',')}`,
  );
}

// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    'gatsby-theme-docz',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-59971789-2',
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: getFonts({
          googleFonts: [
            {
              name: 'Work Sans',
              styles: ['600'],
            },
            {
              name: 'Raleway',
              styles: ['400', '400i', '700'],
            },
          ],
        }),
        display: 'swap',
      },
    },
  ],
};
