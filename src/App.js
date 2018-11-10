import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class App extends Component {
  static defaultProps = {
    center: {
      lat: 30.3929697,
      lng: -91.238454
    },
    zoom: 12
  };

  render() {
    return (
      <div style={{ height: '85vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBxxOcj6qFxS367L-6gXDTKTeoW-qQKNiY" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

        </GoogleMapReact>
      </div>
    );
  }
}

export default App;
