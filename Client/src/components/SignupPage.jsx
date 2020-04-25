import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Input, Row, Col, Card } from 'antd';

import { Link } from "react-router-dom";

import Signup from './Signup';

import {
    updateMessage
} from '../actions/index';

class SignupPage extends Component {
    
    render() {

        return (
            <div className="App" >
                
                <header className="App-header" style={{ backgroundColor: '#E7F0C3'}}>
            
                    <Card bordered={false} style={{ backgroundColor: '#E7F0C3'}}>
                        <Row className="box-shadow" style={{width:'100%', height:'100%'}}>
                            <Col span={8} style={{backgroundColor:'white', height: '100vh', color:'black'}}>
                                <Signup />
                            </Col>
                            <Col span={16} className="signup-right-background" />
                        </Row>
                    </Card>
            
                </header>
            </div>
        );
    }
}

SignupPage.defaultProps = {
    message: '',
};

SignupPage.propTypes = {
    onUpdateMessage: PropTypes.func.isRequired,
    message: PropTypes.string,
};

const mapStateToProps = (state) => {
    const {
        message,
    } = state.default;

    return {
        message,
    };
};

const mapDispatchToProps = dispatch => ({
    onUpdateMessage: (message) => {
        dispatch(updateMessage(message));
    },
});
  
export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);