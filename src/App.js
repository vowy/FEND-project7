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
       address: null,
       activeMarker: null,
       activeMarkerProps: null,
       showingInfoWindow: false,
       filteredLocations: [],
       locations:[],
       query: ''
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

apiSearchLocation = () =>{
  this.postFormData('http://api.geonames.org/search', {username: 'vowy', north: 30.40815, west: -91.278549, south: 30.380068, east: -91.225334, type: "json", style: "LONG"})
   .then(results => results.json())
   .then(data => {
    return this.setState({locations: data.geonames, filteredLocations: data.geonames});
   })}

getStreetAddress = () =>
this.postFormData('http://api.geonames.org/findNearestAddressJSON', {username: 'vowy', lat: this.state.activeMarkerProps.position.lat, lng: this.state.activeMarkerProps.position.lng})
 .then(response => response.json())
 .then(responseJson => {
   const JSONArray=(responseJson)
  this.setState({...JSONArray})
})

componentDidMount() {
  this.apiSearchLocation();
}


mapReady = (props, map) => {
   this.setState({map});
   this.setState({mapProps:props})
 }

closeInfoWindow = (props, marker) => {
  this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null})
}

onMarkerClick = (props, marker, e) => {
  this.closeInfoWindow(props, marker);
  this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
  this.getStreetAddress()
}

onItemClick = (props, marker, e) => {
  console.log(props,marker,e);
}

  render() {


    const amProps = this.state.activeMarkerProps?this.state.activeMarkerProps:null

    const center = {
      lat: this.props.center.lat,
      lng: this.props.center.lng
    }


    const mapStyle={ height: '90%', width: 'auto', overflow: 'hidden' }

    const address = this.state.address

    return (
      <div className='App' id='outer-container'>
        <Menu bodyClassName={ "bm-body" } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <Drawer
          clearFilter={this.clearFilter.bind(this)}
          onQueryUpdate={this.onQueryUpdate.bind(this)}
          filteredLocations={this.state.filteredLocations}
          locations={this.state.locations}
          searchedQuery={this.state.query}
          onItemClick={this.onItemClick}
          />
      </Menu>
        <Map
          id='page-wrap'
          aria-label='map'
          initialCenter={center}
          zoom={this.props.zoom}
          google={this.props.google}
          onReady={this.mapReady}
          onClick={this.closeInfoWindow}
          style={mapStyle}>

{this.state.filteredLocations.map((location,index) =>


<Marker
    animation={(amProps? (((location.lat && location.lng) === (amProps.position.lat && amProps.position.lng))? 1 : 0):2)}
    key={index}
    name={location.name}
    position={({lat: location.lat,lng: location.lng})}
    onClick={(props,marker,e) => this.onMarkerClick(props,marker,e)}
     />

 )}


        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}>
          <div>
          <div className='active-marker-name'>
            <h2>{amProps && amProps.name}</h2>
            </div>
              <div><h3>{`${address && address.streetNumber} ${address && address.street}`}</h3></div>
                      <div><h3>{`Brusly, ${address && address.adminName2}, ${address && address.postalcode}, ${address && address.adminCode1}`}</h3></div>


          </div>
          </InfoWindow>
          </Map>
    </div>

    )
}
}
export default GoogleApiWrapper({  apiKey:'AIzaSyBxxOcj6qFxS367L-6gXDTKTeoW-qQKNiY'})(App)
