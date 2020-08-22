import {
  wrapper as wrapper_,
  innerContainer as innerContainer_,
  menuIcon,
  menuButton,
  headerButton as headerButton_,
  editButton,
} from 'gatsby-theme-docz/src/components/Header/styles';

const wrapper = {
  ...wrapper_,
  /* fallback for old browsers */
  backgroundColor: '#C6FFDD',
  // background: '-webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);'
  background: 'linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);',
};

const innerContainer = {
  ...innerContainer_,
  height: 60,
};

const headerButton = {
  ...headerButton_,
  p: '10px',
  bg: 'rgba(20,20,20,0.9)',
};

export { wrapper, innerContainer, menuIcon, menuButton, headerButton, editButton };
