import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Marker, Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import Drawer from './Drawer.js';



class App extends Component {
  static defaultProps = {
    center: {
      lat: 30.3929697,
      lng: -91.238454
    },
    zoom: 14,

  }
  constructor(props) {
     super(props);
     this.state={
       mapProps: [],
       activeMarker: null,
       activeMarkerProps: null,
       showingInfoWindow: false,
       filteredLocations: [],
       query: '',
     }
   }


  onQueryUpdate = (val) => {
  this.setState({query:val});
  this.setState({filteredLocations: (this.state.locations.filter(place => place.name.toLowerCase().includes(this.state.query.toLowerCase())))});
}


  clearFilter = () => {
    this.setState({filteredLocations: this.state.locations})
    this.setState({query: ''})
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

apiSearchLocation = () =>
  this.postFormData('http://api.geonames.org/search', {username: 'vowy', north: 30.40815, west: -91.278549, south: 30.380068, east: -91.225334, type: "json", style: "SHORT"})
   .then(results => results.json())
   .then(data => {
     return this.setState({locations: data.geonames, filteredLocations: data.geonames});
   })


componentDidMount() {
  this.apiSearchLocation();
}


mapReady = (props, map) => {
   this.setState({map});
   this.setState({mapProps: props});
 }

closeInfoWindow = (props, marker) => {
  this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null})
}

onMarkerClick = (props, marker, e) => {
  this.closeInfoWindow(props, marker);
  marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
  this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
}



  render() {


    let amProps = this.state.activeMarkerProps


    const center = {
      lat: this.props.center.lat,
      lng: this.props.center.lng
    }

    const mapStyle={ height: '90%', width: 'auto', overflow: 'hidden' }



    return (
      <div className='App' id='outer-container'>
        <Menu bodyClassName={ "menuBody" } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <Drawer
          clearFilter={this.clearFilter.bind(this)}
          onQueryUpdate={this.onQueryUpdate.bind(this)}
          filteredLocations={this.state.filteredLocations}
          locations={this.state.locations}
          searchedQuery={this.state.query}
          >
      </Drawer>

      </Menu>

        <Map id='page-wrap'
          aria-label='map'
          initialCenter={center}
          zoom={this.props.zoom}
          google={this.props.google}
          onReady={this.mapReady}
          onClick={this.closeInfoWindow}
          style={mapStyle}>

{this.state.filteredLocations.map((location,index) =>
{let position={lat: location.lat,
          lng: location.lng}

return  <Marker
    animation={(amProps? (((location.lat && location.lng) === (amProps.position.lat && amProps.position.lng))? 1 : 0):2)}
    key={index}
    name={location.name}
    position={position}
    onClick={this.onMarkerClick}
     />;


 } )}


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
