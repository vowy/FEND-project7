import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import locations from './data/locations.json';



class App extends Component {
  static defaultProps = {
    center: {
      lat: 30.3929697,
      lng: -91.238454
    },
    zoom: 15,
    all: locations
  }
  constructor(props) {
     super(props);
     this.state={
       hits: [],
       markers: [],
       markerProps: [],
       activeMarker: null,
       activeMarkerProps: null,
       showingInfoWindow: false,
       currentLocation: []
     }
   }

  postFormData = (url, data) => {
    return fetch(url, {
      method: 'POST',
      credentials: 'omit',
      body: new URLSearchParams(data),
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded'
      })
    })
  }


componentDidMount() {
  this.postFormData('http://api.geonames.org/search', {username: 'vowy', north: 30.40815, west: -91.278549, south: 30.380068, east: -91.225334, type: "json", style: "SHORT"})
   .then(results => results.json())
   .then(data => console.log(data))
 }


mapReady = (props, map) => {
   this.setState({map});
   this.updateMarkers(this.props.all)
 }

closeInfoWindow = () => {
  this.state.activeMarker && this.state.activeMarker.setAnimation(null);
  this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps:null})
}

onMarkerClick = (props, marker, e) => {
  this.closeInfoWindow();
  this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
}

updateMarkers = (locations) => {

  this.state.markers.forEach(marker => marker.setMap(null));
  let markerProps = [];
  let marker = locations.map((location, index) => {
    let mProps = {
      key: index,
      index,
      name: location.name,
      position: location.pos
    };
    markerProps.push(mProps);

    let animation = this.props.google.maps.Animation.DROP;
    let marker = new this.props.google.maps.Marker({
      position: location.pos,
      map: this.state.map,
      animation
    });
    marker.addListener('click', () => {
      this.onMarkerClick(mProps, marker, null);
    });
    return marker;
  })
  this.setState({marker, markerProps});
}
  render() {

    const { hits } = this.state.hits;

    let amProps = this.state.activeMarkerProps


    const center = {
      lat: this.props.center.lat,
      lng: this.props.center.lng
    }

    const style={ height: '85vh', width: '100%' }


    return (
      <div className="App">
        <div id= "heading-text">
          <h1>Neighborhood Map of Brusly, Louisiana</h1>
        </div>
        <Map
          aria-label="map"
          initialCenter={center}
          zoom={this.props.zoom}
          google={this.props.google}
          locations={this.props.all}
          onReady={this.mapReady}
          onClick={this.closeInfoWindow}
          style={style}
          center={this.props.center}>
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}>
          <div>
            <h2>{amProps && amProps.name}</h2>

          </div>
          </InfoWindow>
          </Map>
    </div>
    )
}
}
export default GoogleApiWrapper({  apiKey:'AIzaSyBxxOcj6qFxS367L-6gXDTKTeoW-qQKNiY'})(App)
