import React from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import config from 'config';
import Pin from './Pin';

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
      popupInfo: null,
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

  renderMarker = (place, index) => {
    console.log('Place: ', place);
    return (
      <Marker
        key={`marker-${index}`}
        latitude={place.lat}
        longitude={place.long}>
        <Pin onClick={() => this.setState({popupInfo: place})} />
      </Marker>
    );
  };

  renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.long}
          latitude={popupInfo.lat}
          onClose={() => this.setState({popupInfo: null})}>
          <div>{popupInfo.name}</div>
        </Popup>
      )
    );
  }

  render() {
    const {viewport} = this.state;
    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={this.updateViewport}
        mapboxApiAccessToken={config.mapbox.accessToken}>
        {config.maps.sanFrancisco.markers.map(this.renderMarker)}
        {this.renderPopup()}
      </ReactMapGL>
    );
  }
}

export default SanFranciscoMap;
