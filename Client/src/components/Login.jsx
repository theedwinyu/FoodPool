import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Input, Row, Col, Form, Button } from 'antd';

import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import yellowLogo from '../assets/yellowLogo.png';

import Message from './Message';

import {
    updateMessage
} from '../actions/index';

const { Search } = Input;

class Login extends Component {

    onFinish = values => {
        console.log('Success:', values);
      };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <header className="login-centered">
                {/* style={{ 
                    marginLeft: '10vh', marginRight: '10vh', marginTop: '30vh', justifyContent: 'center', textAlign: 'center' 
                }} */}
                <img src={yellowLogo} style={{width: '70%', height: 'auto'}}/>
                <p></p>
                <h2 style={{textAlign:'left'}}>Login</h2>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        name="phoneNumber"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        ]}
                    >
                        {/* <Input /> */}
                        <TextField id="standard-basic" label="Phone Number" style={{width: '45vh'}}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        {/* <Input.Password /> */}
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            style={{width: '45vh'}}
                        />
                    </Form.Item>

                    <Link to={{ pathname: '/' }} > <i>Forgot Password?</i> </Link>
                    <p></p>

                    <Form.Item>
                        <Button type="default" htmlType="submit" style={{width: '45vh', color:'black', backgroundColor:'#F9DE92', height: '7vh'}}>
                        Sign In
                        </Button>
                    </Form.Item>

                    <p style={{display:'inline-block'}}>New user?</p>
                    <Link to={{ pathname: '/signup' }} style={{display:'inline-block'}}>&nbsp;Create a new account </Link>
                    
                    <p></p>

                </Form>
            </header>
        );
    }
}

// Login.defaultProps = {
//     message: '',
// };

// Login.propTypes = {
//     onUpdateMessage: PropTypes.func.isRequired,
//     message: PropTypes.string,
// };

// const mapStateToProps = (state) => {
//     const {
//         message,
//     } = state.default;

//     return {
//         message,
//     };
// };

// const mapDispatchToProps = dispatch => ({
//     onUpdateMessage: (message) => {
//         dispatch(updateMessage(message));
//     },
// });
  
// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default Login;