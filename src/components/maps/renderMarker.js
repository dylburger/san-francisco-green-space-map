import React from 'react';
import ReactDOM from 'react-dom';
import Marker from './Marker';

const renderMarker = () => {
  const div = document.createElement('div');
  const marker = <Marker onClick={() => console.log('click')} />;
  ReactDOM.render(marker, div);

  return div;
};

export default renderMarker;
