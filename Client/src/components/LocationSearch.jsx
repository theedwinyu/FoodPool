import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
import axios from 'axios';

import { CompassOutlined } from '@ant-design/icons';

import {
  updateAddress,
  updateNearbyResults,
} from '../actions/index';

import { Input, AutoComplete, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;

class LocationSearch extends Component {

     
    handleSelect = address => {
    
      const {
        onUpdateAddress,
        onUpdateNearbyResults,
      } = this.props;

      const query = `restaurants near ${address.description}`

      const proxyurl = "https://cors-anywhere.herokuapp.com/"
      const nearbyURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+query+"&key=" + process.env.REACT_APP_GOOGLE_MAPS_KEY;
      
      axios.get(nearbyURL).then(nearbyResult => {
          onUpdateAddress(address.description);
          onUpdateNearbyResults(nearbyResult.data.results)
        }
      );

    };
     
      render() {

        return (
          <div style={{width: '60%', marginLeft: '20%'}}>
            <GooglePlacesAutocomplete
              onSelect={this.handleSelect}
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
            />
          </div>
        
        );
      }

}

LocationSearch.defaultProps = {
  address: '',
  nearbyResults: [],
};

LocationSearch.propTypes = {
  onUpdateAddress: PropTypes.func.isRequired,
  address: PropTypes.string,
  onUpdateNearbyResults: PropTypes.func.isRequired,
  nearbyResults: PropTypes.array,
};

const mapStateToProps = (state) => {
  const {
      address,
      nearbyResults
  } = state.default;

  console.log(state);

  return {
      address,
      nearbyResults,
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateAddress: (address) => {
      dispatch(updateAddress(address));
  },
  onUpdateNearbyResults: (nearbyResults) => {
    dispatch(updateNearbyResults(nearbyResults))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);