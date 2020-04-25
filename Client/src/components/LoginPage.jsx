import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Input, Row, Col, Card } from 'antd';

import { Link } from "react-router-dom";

import Message from './Message';
import Login from './Login';

import {
    updateMessage
} from '../actions/index';

const { Search } = Input;

class LoginPage extends Component {

    // changeMessage = (value) => {
    //     const {
    //         onUpdateMessage,
    //     } = this.props;
    //     onUpdateMessage(value);
    // } 
    
    render() {
        const {
            message,
        } = this.props;
        return (
            <div className="App" >
                {/* <div className='stripes'>
                <span></span>
                <span></span> 
                <span></span> 
                <span></span> 
                <span></span>
                </div> */}
                <header className="App-header" style={{ backgroundColor: '#E7F0C3'}}>
                    {/* <img src={logo} className="App-logo" alt="logo" />
                    <p>
                    Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    Learn React
                    </a>
                    <Message />
                    <Search placeholder="input message" onSearch={this.changeMessage} enterButton /> */}

                    {/* style={{width:'90%', height:'5%'}} className="centered" */}
                    <Card bordered={false} style={{ backgroundColor: '#E7F0C3'}}>
                        <Row className="box-shadow" style={{width:'100%', height:'100%'}}>
                            <Col span={16} className="login-left-background" />
                            <Col span={8} style={{backgroundColor:'white', height: '100vh', color:'black'}}>
                                <Login />
                            </Col>
                        </Row>
                    </Card>
                
                    {/* <Link to={{ pathname: '/Message', state: { message } }} > To Message </Link> */}
                </header>
            </div>
        );
    }
}

LoginPage.defaultProps = {
    message: '',
};

LoginPage.propTypes = {
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
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);