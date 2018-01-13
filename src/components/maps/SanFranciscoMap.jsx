import React from 'react';
import mapboxgl from 'mapbox-gl';

import config from 'config';
import data from 'geojson/sf_rec_parks_properties.json';

const options = [
  {
    name: 'Parks',
    description: 'Parks',
    property: 'parks',
    fillColor: '#1e932d',
  },
];

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
      active: options[0],
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
    const {latitude, longitude, zoom} = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/dylburger/cjccuciq62k5o2rqw7ha6gp1p',
      center: [longitude, latitude],
      zoom,
    });

    this.map.on('load', () => {
      this.map.addSource('parks', {
        type: 'geojson',
        data,
      });

      this.map.addLayer(
        {
          id: 'parks',
          type: 'fill',
          source: 'parks',
        },
        'country-label-lg',
      ); // ID matches `mapbox/streets-v9`

      this.setFill();
    });
  }

  componentDidUpdate() {
    this.setFill();
  }

  setFill() {
    const {fillColor} = this.state.active;
    this.map.setPaintProperty('parks', 'fill-color', fillColor);
  }

  render() {
    return (
      <div
        ref={el => (this.mapContainer = el)}
        className="absolute top right left bottom"
      />
    );
  }
}

export default SanFranciscoMap;
