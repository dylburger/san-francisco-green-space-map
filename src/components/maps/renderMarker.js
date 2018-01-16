import React from 'react';
import ReactDOM from 'react-dom';
import Marker from './Marker';

const renderMarker = imgSrc => {
  const div = document.createElement('div');
  const pin = <Marker imgSrc={imgSrc} onClick={() => console.log('click')} />;
  ReactDOM.render(pin, div);

  return div;
};

export default renderMarker;
