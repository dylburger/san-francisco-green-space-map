import {func, string} from 'prop-types';
import React from 'react';

const Marker = ({imgSrc, onClick}) => (
  <img alt="Marker" src={imgSrc} onClick={onClick} />
);

Marker.propTypes = {
  imgSrc: string.isRequired,
  onClick: func.isRequired,
};

export default Marker;
