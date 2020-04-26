import React, { Component } from 'react';

import { Card, Row, Col, Divider } from 'antd';
import newLogo from '../assets/newLogo.png';
import Chatroom from './Chatroom';

import { withRouter } from "react-router-dom"

class Room extends Component {
    render(){
        const {
            orderValues, 
            restaurant,
        } = this.props.location.state;

        return(
            <div className="App" >
                
                <header className="App-header" style={{ backgroundColor: '#E7F0C3'}}>
                    <Card bordered={false} style={{ backgroundColor: '#E7F0C3'}}>
                        <Row className="box-shadow" style={{width:'100%', height:'100%'}}>

                            <Col span={24} style={{backgroundColor:'white', color:'black'}}>
                                <img src={newLogo} style={{width: '25%', height: 'auto', marginTop:'2%'}}/>
                                <Divider />

                                <Row style={{width: '90%', margin:'5%'}}>
                                    {/* <Col span={8} style={{backgroundColor:'white',  color:'black'}}>
                                       
                                    </Col>
                                    <Col span={1} /> */}
                                    <Col span={24} style={{backgroundColor:'white', color:'black'}}>
                                        <Chatroom restaurant={restaurant} name="Edwin"/>
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

export default withRouter(Room);