import oceanBeach from 'typography-theme-ocean-beach';
import { toTheme } from '@theme-ui/typography';
import { merge } from 'lodash/fp';

import * as modes from 'gatsby-theme-docz/src/theme/modes';
import prism from 'gatsby-theme-docz/src/theme/prism';
import styles from 'gatsby-theme-docz/src/theme/styles';

oceanBeach.headerWeight = 700;
const typography = toTheme(oceanBeach);

export default merge(typography, {
  initialColorMode: 'light',
  // Show errors above playground editor
  showLiveError: true,
  // Show preview of the code inside playground
  showLivePreview: true,
  // Show editor when a playground is rendered
  showPlaygroundEditor: true,
  // Show dark/light mode switch toggle in header
  showDarkModeSwitch: true,
  // Display edit this page button on every page
  showMarkdownEditButton: true,
  // Wrap the playground editor and preview in iframes to avoid style/script collisions
  useScopingInPlayground: false,
  colors: {
    ...modes.light,
    modes: {
      dark: modes.dark,
    },
  },
  fonts: {
    monospace: 'Inconsolata',
  },
  fontSizes: [10, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em',
  },
  space: [0, 4, 8, 16, 32, 48, 64, 80, 100],
  radii: {
    square: 0,
    radius: 4,
    rounded: 10,
  },
  styles,
  prism,
});
