import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Input, Row, Col, Form, Button } from 'antd';

import { Link,Redirect} from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import yellowLogo from '../assets/yellowLogo.png';
import topLogo from '../assets/topLogo.png';

import axios from 'axios';
import Cookie from "js-cookie"

import Message from './Message';

import {
    updateMessage
} from '../actions/index';

const { Search } = Input;

class Login extends Component {
    state = {
        redirect: (Cookie.get("login")!=null)
    }



    onFinish = values => {
        console.log('Success:', values);

        let exist = "false";

        const userInfo = {
            phoneNumber: values.phoneNumber,    
            password: values.password
        }

        axios.post('/users/userCheck', userInfo)
        .then(res=> { 
            if(res.data == null){
                console.log("Wrong!")
            } else {
                Cookie.set("login",res.data,{expires:1})
                this.setState({ redirect: true})
            }
            exist = res})
        
        // if (exist === "true") {
        //     //redirect
        // } else {
        //     //invalid input
        // }

    };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        if(this.state.redirect) {
            return <Redirect to="select-location"/>
        }
        return (
            <header className="login-centered">
                {/* style={{ 
                    marginLeft: '10vh', marginRight: '10vh', marginTop: '30vh', justifyContent: 'center', textAlign: 'center' 
                }} */}
                <img src={topLogo} style={{width: '50%', height: 'auto'}}/>
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