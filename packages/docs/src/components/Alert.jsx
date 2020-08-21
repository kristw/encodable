/* eslint-disable react/prop-types */
import React from 'react';

const kinds = {
  info: '#5352ED',
  positive: '#2ED573',
  negative: '#FF4757',
  warning: '#FFA502',
};

const AlertStyled = ({ children, kind, ...rest }) => (
  <div
    style={{
      padding: 20,
      borderRadius: 3,
      color: 'white',
      background: kinds[kind] ?? 'white',
    }}
    {...rest}
  >
    {children}
  </div>
);

const Alert = props => <AlertStyled {...props} />;

export default Alert;
