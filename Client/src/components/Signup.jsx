import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Input, Row, Col, Form, Button } from 'antd';

import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import yellowLogo from '../assets/yellowLogo.png';
import axios from 'axios';

import Message from './Message';

import {
    updateMessage
} from '../actions/index';

const { Search } = Input;

class Signup extends Component {

    onFinish = values => {
        console.log('Success:', values);

        const user = {
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            address: values.address,
            email: values.email,
            password: values.password
        }

        axios.post('http://localhost:5000/users/add', user)
            .then(res=> { console.log("User Added!!") })
    };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <header className="sign-up-centered" style={{color: 'black', textAlign:'left'}}>
                
                <img src={yellowLogo} style={{width: '70%', height: 'auto'}}/>
                <p></p>
                <h2>Sign up!</h2>
                <p></p>
                <p>Tell us more about you so you can start ordering.</p>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        name="fullName"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        ]}
                    >
                        <TextField id="standard-basic" label="Full Name" style={{width: '45vh'}}/>
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        ]}
                    >
                        <TextField id="standard-basic" label="Phone Number" style={{width: '45vh'}}/>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        ]}
                    >
                        <TextField id="standard-basic" label="Address" style={{width: '45vh'}}/>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        ]}
                    >
                        <TextField id="standard-basic" label="Email Address" style={{width: '45vh'}}/>
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

                    <Form.Item>
                        <Button type="default" htmlType="submit" style={{width: '45vh', color:'black', backgroundColor:'#F9DE92', height: '7vh'}}>
                        Start Ordering!
                        </Button>
                    </Form.Item>

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
export default Signup;