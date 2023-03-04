import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.css';

//-- 1. как работает проп ...allyProps
const IconButton = ({ children, onClick, ...allyProps }) => (
  <button type="button" className="IconButton" onClick={onClick} {...allyProps}>
    {children}
  </button>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  //! для иконок этот пропс важен
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;

/* //--(1) мы собираем пропы доступности в обьект allyProps и потом внизу его распыляем {...allyProps}
//--распыление: 
//-- если пришел обьект {a:1, b:2, c:3} то {...allyProps } аналогично a={object.a} b={object.b} c={object.c}
*/
