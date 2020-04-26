import React, { Component } from 'react';
import Cookie from 'js-cookie'
import axios from 'axios'
import { Link,Redirect} from "react-router-dom";

import { Modal, Button, Row, Col, List, Comment, Input, Card, Divider } from 'antd';
import TextField from '@material-ui/core/TextField';

import { Redirect } from 'react-router-dom';

import { CheckOutlined } from '@ant-design/icons';

const { Search } = Input;


class OrderModal extends Component {


    constructor(props){
        super(props);
        this.state = {
            visible: false,
            orderValues: [],
            data: [],
        }
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
    handleOk = e => {
        this.setState({
            done: true,
        });

    };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    addToOrder = value => {
        this.setState({
            orderValues: [...this.state.orderValues, value],
            data: [...this.state.data, {content: (<div><p style={{fontSize:'9px'}}>{value}</p></div>)}],
        })
    }

    onChange = (e) => {
        console.log(e.target.value);
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="room"/>
        }
        const {
            restaurant,
        } = this.props;

        if (this.state.done) {
            console.log(restaurant, this.state.orderValues)
            return <Redirect to={{ pathname: '/room', state: { orderValues: this.state.orderValues, restaurant }}} />
        }
        
        const restaurantTitle = [{
            content: (
              <div>
                  <b style={{fontSize:'10px'}}>{restaurant.title}</b>
                  {/* <p style={{fontSize:'9px'}}>{restaurant.formatted_address}</p> */}
              </div>
            ),
            },
        ]

        const newData = [...restaurantTitle, ...this.state.data];

        return (
            <div>
                <Button type="default" shape="round" icon={<CheckOutlined />} onClick={this.showModal} style={{backgroundColor: '#A4D4AE'}}>
                Select Restaurant
                </Button>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="default" onClick={this.handleOk} style={{color:'black', backgroundColor:'#F9DE92'}}>
                            Get My Food!
                        </Button>,
                    ]}
                >
                <Row>
                    <Col span={16}>
                        <h2>Checkout</h2>
                        <TextField id="standard-basic" label="Name" onChange={this.onChange}/>
                        <p></p>
                        <TextField id="standard-basic" label="Credit Card Number" onChange={this.onChange}/>
                        <p></p>
                        <TextField id="standard-basic" label="Security Code" onChange={this.onChange}/>
                        <p></p>
                        <TextField id="standard-basic" label="Expiration Month" onChange={this.onChange}/>
                        <p></p>
                        <TextField id="standard-basic" label="Expiration Year" onChange={this.onChange}/>
                    </Col>
                    <Col span={8}>
                        <h3>Order Summary</h3>
                        <Card style={{backgroundColor:'#F9DE92', borderRadius: '6px', color:'black', overflowY:'scroll', height:'50vh'}}>
                            <List
                                className="comment-list"
                                itemLayout="horizontal"
                                dataSource={newData}
                                renderItem={item => (
                                    <div>
                                        <li >
                                            <Comment
                                            content={item.content}
                                            />
                                        </li>
                                        {/* <Divider style={{backgroundColor: 'black'}}/> */}
                                    </div>
                                
                                )}
                            />
                        </Card>
                        <p></p>
                        <Search
                        placeholder="What do you want to order?"
                        onSearch={value => this.addToOrder(value)}
                        />
                    </Col>
                </Row>
                </Modal>
            </div>
        );
    }
}

export default OrderModal;