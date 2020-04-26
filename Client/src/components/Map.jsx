import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import { Card } from 'antd';

class Map extends Component {

    calculateAndDisplayRoute = (directionsService, directionsDisplay, path) => {
        const middle = path.slice(1,-1);
        const {0 : origin ,[path.length - 1] : destination} = path;
        const waypoints = middle.map(x => {return {location: x, stopover: true}});
        directionsService.route({
          origin,
          destination,
          waypoints,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }

    handleGoogleMapApi = (google) => {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        const {
          roomUsers,
        } = this.props;
        console.log(roomUsers);

        const path = [ { "lat": 37.4254329, "lng": -122.1452003 },{ "lat": 37.428023,"lng": -122.143825 },{ "lat": 37.382221,"lng": -122.193769 } ];

        for (let i = 0; i < path.length-1; i++){
            this.calculateAndDisplayRoute(directionsService, directionsDisplay, path);
        }

        directionsDisplay.setMap(google.map);
    }

    render() {

        const {
          shopLoc,
        } = this.props;

        const center = {
          "lat": 37.4015821,
          "lng": -122.1933555,
        }

        console.log(shopLoc);

        return (

            <div style={{ height: '50vh', width: '100%', borderRadius: '12px' }}>
                {/* <Card> */}
                <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
                defaultCenter={center}
                defaultZoom={11}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={this.handleGoogleMapApi}
                >
    
                </GoogleMapReact>
                {/* </Card> */}

            </div>
        );
    }
}
 
export default Map;