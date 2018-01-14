import React from 'react';
import mapboxgl from 'mapbox-gl';

import config from 'config';
import parks from 'data/sf_parks_metadata.json';
import renderMarker from './renderMarker';

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

    // Thanks to the Mapbox docs for this example of loading 3D building data.
    // https://www.mapbox.com/mapbox-gl-js/example/3d-buildings/
    this.map.on('load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = this.map.getStyle().layers;

      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      this.map.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId,
      );
    });

    // Add markers to the map for each park
    parks.forEach(park => {
      if ('location_1' in park) {
        if ('coordinates' in park.location_1) {
          // make a marker for each feature and add to the map
          new mapboxgl.Marker(renderMarker())
            .setLngLat(park.location_1.coordinates)
            .addTo(this.map);
        }
      }
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
