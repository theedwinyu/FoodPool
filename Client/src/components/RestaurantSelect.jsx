import React, { Component } from 'react';

import { Card, Row } from 'antd';
import Cookie from 'js-cookie'


class RestaurantSelect extends Component {

    render() {
        return (
            <div className="App" >
                <h1>{JSON.stringify(Cookie.get("login"))}</h1>
                <header className="App-header" style={{ backgroundColor: '#E7F0C3'}}>
                    <Card bordered={false} style={{ backgroundColor: '#E7F0C3'}}>
                        <Row className="box-shadow" style={{width:'100%', height:'100%'}}>
                            
                            {/* <Col span={8} style={{backgroundColor:'white', height: '100vh', color:'black'}}>
                                <Signup />
                            </Col>
                            <Col span={16} className="signup-right-background" /> */}
                        </Row>
                    </Card>
            
                </header>
            </div>
        )
    }
}

export default RestaurantSelect;