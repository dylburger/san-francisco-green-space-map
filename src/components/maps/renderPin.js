import React from 'react';
import ReactDOM from 'react-dom';
import Pin from './Pin';

const renderPin = fill => {
  const div = document.createElement('div');
  const pin = <Pin fill={fill} onClick={() => console.log('click')} />;
  ReactDOM.render(pin, div);

  return div;
};

export default renderPin;
