import React from 'react';
import ReactMapGL from 'react-map-gl';

import config from 'config';

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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

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
    const {viewport} = this.state;
    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={this.updateViewport}
        mapboxApiAccessToken={config.mapbox.accessToken}
      />
    );
  }
}

export default SanFranciscoMap;
