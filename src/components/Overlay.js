import React from 'react';
import PropTypes from 'prop-types';

import './overlay.scss';

const Overlay = ({ text, buttons = [] }) => (
  <div className="overlay">
    <div className="body">
      <div className="text">{text}</div>
      <div>
        {buttons.map(({ caption, onClick }, i) => (
          <button key={i} onClick={onClick} className="action">{caption}</button>
        ))}
      </div>
    </div>
  </div>
);

Overlay.propTypes = {
  text: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string,
    onClick: PropTypes.func
  }))
};

export default Overlay;
