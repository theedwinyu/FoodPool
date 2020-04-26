import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import { Card } from 'antd';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import {
    updateDistance,
    updateMessage,
} from '../actions/index';

class Map extends Component {

  bestPersonRoute = (loclst,shop) => {
    let mindist = Number.MAX_VALUE
    let minpath = null
    for(let x in loclst){
        let nlst = [...loclst]
        nlst.splice(x,1)
        if (mindist > this.bestDist(shop,loclst[x],nlst).distance){
            mindist = this.bestDist(shop,loclst[x],nlst).distance
            minpath = this.bestDist(shop,loclst[x],nlst).route
        }
    }

    return {path:minpath,distance:mindist}
}

  distance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
  }
  
  swap = (alphabets, index1, index2) => {
      var temp = alphabets[index1];
      alphabets[index1] = alphabets[index2];
      alphabets[index2] = temp;
      return alphabets;
  }
  
   permutator = (inputArr) => {
      let result = [];
    
      const permute = (arr, m = []) => {
        if (arr.length === 0) {
          result.push(m)
        } else {
          for (let i = 0; i < arr.length; i++) {
            let curr = arr.slice();
            let next = curr.splice(i, 1);
            permute(curr.slice(), m.concat(next))
         }
       }
     }
    
     permute(inputArr)
    
     return result;
    }
  
   totDist = (nodes) => {
      if(nodes.length <= 1){
          return 0
      }
  
      let td = 0
  
      for(let i = 1 ; i<nodes.length;i++){
          td += this.distance(nodes[i-1].lat,nodes[i-1].lng,nodes[i].lat,nodes[i].lng)
      }
  
      return td
  }
  
  bestDist = (shop,home,nodes) => {
      let nodeperms = this.permutator(nodes)
      if(nodes.length == 0){
          return this.distance(home.lat,home.lng,shop.lat,shop.lng)*2
      }
      let bd = this.distance(home.lat,home.lng,shop.lat,shop.lng)
      let minpermd = Number.MAX_VALUE
      let minperm = null
  
      for (let perm in nodeperms){
          let permd = this.distance(shop.lat,shop.lng,nodeperms[perm][0].lat,nodeperms[perm][0].lng) + this.distance(nodeperms[perm][perm.length - 1].lat,nodeperms[perm][perm.length - 1].lng,home.lat,home.lng)
          permd += this.totDist(nodeperms[perm])
  
          if(permd < minpermd){
              minpermd = permd
              minperm = [home,shop,...nodeperms[perm],home]
          }
      } 
  
      return {route:minperm,distance:minpermd}
  
  }

  
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
          shopLoc,
          onUpdateDistance,
          onUpdateMessage,
        } = this.props;
        console.log(roomUsers);

        const convertedUsers = roomUsers.map(x => JSON.parse(x));
        console.log("was", convertedUsers)
        console.log(shopLoc);

        const result = this.bestPersonRoute(convertedUsers, shopLoc)
        
        if(result.path && result.path.length){
          onUpdateDistance(result.distance);
          onUpdateMessage(result.path[0].name);
          for (let i = 0; i < result.path.length-1; i++){
            this.calculateAndDisplayRoute(directionsService, directionsDisplay, result.path);
          }
        }
        
        // console.log(path);

        // const path = [ { "lat": 37.4254329, "lng": -122.1452003 },{ "lat": 37.428023,"lng": -122.143825 },{ "lat": 37.382221,"lng": -122.193769 } ];

        

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
 
Map.defaultProps = {
  distance: null,
  message: '',
};

Map.propTypes = {
  onUpdateDistance: PropTypes.func.isRequired,
  distance: PropTypes.number,
  onUpdateMessage: PropTypes.func.isRequired,
  message: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  onUpdateDistance: (distance) => {
      dispatch(updateDistance(distance));
  },
  onUpdateMessage: (message) => {
    dispatch(updateMessage(message));
},
});

export default connect(null, mapDispatchToProps)(Map);