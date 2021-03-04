import React, { Component } from "react";
import { Map, Marker, Polyline, GoogleApiWrapper } from "google-maps-react";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;


export class MapContainer extends Component {
  state = {
    markers: [

    ]
  };
  style = {
    width: "100%",
    height: "100%"
  };

  onMapClick = (mapProps, map, clickEvent) => {
    console.log(clickEvent)
    const updatedMarkers = [...this.state.markers];
    updatedMarkers.push({ key: this.state.markers.length, lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng() });
    this.setState({ markers: updatedMarkers });
  };
  render() {
    return (
      <Map
        google={this.props.google}
        style={this.style}
        initialCenter={{
          lat: 53.278264222500994,
          lng: -2.477740838573294
        }}
        zoom={16}
        onClick={this.onMapClick}
        draggable={true}
        disableDoubleClickZoom={true}
      >
        {/*this.state.markers.map((coords, index) => <Marker key={`marker-${index}`} position={coords} />)*/}
        {console.log(this.state.markers)}

        {this.state.markers.map((coords, index) => {
          if (index === 0 || index === this.state.markers.length - 1) {
            return <Marker key={`marker-${index}`} position={coords} />
          }
          return null;
        })}


        <Polyline
          path={this.state.markers}
          strokeColor='#0000ff'
          strokeOpacity={0.8}
          strokeWeight={6}
          editable={true}
          draggable={true}

        />
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);