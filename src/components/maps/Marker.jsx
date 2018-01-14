import {func} from 'prop-types';
import React from 'react';
import Pin from './Pin';

const Marker = ({onClick}) => (
  <div>
    <Pin onClick={onClick} />
  </div>
);

Marker.propTypes = {
  onClick: func.isRequired,
};

export default Marker;
