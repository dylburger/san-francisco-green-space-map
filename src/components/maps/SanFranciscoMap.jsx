import React from 'react';
import ReactMapGL from 'react-map-gl';
import {json as requestJson} from 'd3-request';
import {fromJS} from 'immutable';

import config from 'config';
import {defaultMapStyle} from './mapStyle';

// Code courtesy of react-map-gl examples
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
      mapStyle: defaultMapStyle,
      data: null,
      viewport: {
        latitude,
        longitude,
        zoom,
        bearing,
        pitch,
        width,
        height,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();

    requestJson(
      'public/geojson/sf_rec_parks_properties.geojson',
      (error, response) => {
        if (!error) {
          this.loadData(response);
        }
      },
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  loadData = data => {
    const mapStyle = defaultMapStyle
      // Add geojson source to map
      .setIn(['sources', 'parks'], fromJS({type: 'geojson', data}));

    this.setState({data, mapStyle});
  };

  resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  updateViewport = viewport => {
    this.setState({viewport});
  };

  render() {
    const {mapStyle, viewport} = this.state;
    return (
      <ReactMapGL
        mapStyle={mapStyle}
        {...viewport}
        onViewportChange={this.updateViewport}
        mapboxApiAccessToken={config.mapbox.accessToken}
      />
    );
  }
}

export default SanFranciscoMap;
