import React from 'react';
import mapboxgl from 'mapbox-gl';

import config from 'config';

class SanFranciscoMap extends React.Component {
  constructor(props) {
    super(props);

    const {
      latitude,
      longitude,
      zoom,
      bearing,
      pitch,
      width,
      height,
    } = config.maps.sanFrancisco;

    this.state = {
      latitude,
      longitude,
      zoom,
      bearing,
      pitch,
      width,
      height,
    };
  }

  componentWillMount() {
    mapboxgl.accessToken = config.mapbox.accessToken;
  }

  componentDidMount() {
    const {latitude, longitude, zoom, pitch, bearing} = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [longitude, latitude],
      zoom,
      pitch,
      bearing,
    });
  }

  render() {
    return (
      <div
        ref={el => (this.mapContainer = el)} // eslint-disable-line no-return-assign
        className="absolute top right left bottom"
      />
    );
  }
}

export default SanFranciscoMap;
