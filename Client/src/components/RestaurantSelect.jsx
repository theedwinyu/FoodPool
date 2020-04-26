import React, { Component } from 'react';

import Cookie from 'js-cookie'
import { Link,Redirect} from "react-router-dom";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Card, Row, Col, Divider } from 'antd';

import LocationSearch from './LocationSearch';
import RestaurantList from './RestaurantList';
import RestaurantFilter from './RestaurantFilter';
import greenLogo from '../assets/greenLogo.png';

import newLogo from '../assets/newLogo.png';

import backgroundImage from '../assets/list-background.jpg';

class RestaurantSelect extends Component {

    state = {
        redirect: (Cookie.get("room")!=null)
    }

    render() {
        if(this.state.redirect){
            return <Redirect to="room"/>
        }
        const {
            address,
            nearbyResults
        } = this.props;

        return ( 
            <div className="App" >
                {/* <h1>{JSON.stringify(Cookie.get("login"))}</h1> */}
                <header className="App-header" style={{ backgroundColor: '#E7F0C3'}}>
                    <Card bordered={false} style={{ backgroundColor: '#E7F0C3'}}>
                        <Row className="box-shadow" style={{width:'100%', height:'100%'}}>

                            <Col span={24} style={{backgroundColor:'white', color:'black'}}>
                                <img src={newLogo} style={{width: '25%', height: 'auto', marginTop:'2%'}}/>
                                <Divider />
                                <LocationSearch />
                                <Row style={{width: '90%', margin:'5%'}}>
                                    <Col span={9} style={{backgroundColor:'white',  color:'black'}}>
                                        <RestaurantFilter nearbyResults={nearbyResults}/>
                                    </Col>
                                    <Col span={1} />
                                    <Col span={12} style={{backgroundColor:'white', color:'black'}}>
                                        <RestaurantList nearbyResults={nearbyResults}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        
                    </Card>
            
                </header>
            </div>
        )
    }
}

RestaurantSelect.defaultProps = {
    address: '',
    nearbyResults: [],
  };
  
RestaurantSelect.propTypes = {
    address: PropTypes.string,
    nearbyResults: PropTypes.array,
};

const mapStateToProps = (state) => {
    const {
        address,
        nearbyResults
    } = state.default;
  
    return {
        address,
        nearbyResults,
    };
};

export default connect(mapStateToProps)(RestaurantSelect);