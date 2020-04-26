import React, { Component } from 'react';
import Cookie from 'js-cookie'
import axios from 'axios'
import { Link,Redirect} from "react-router-dom";

import { Modal, Button, Row, Col, List, Comment, Input, Card, Divider } from 'antd';
import TextField from '@material-ui/core/TextField';

import { CheckOutlined } from '@ant-design/icons';

const { Search } = Input;


class OrderModal extends Component {


    constructor(props){
        super(props);
        this.state = {
            visible: false,
            orderValues: [],
            data: [],
            redirect:false
        }
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
    handleOk = e => {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+JSON.parse(Cookie.get("login")).address+"&key="+process.env.REACT_APP_GOOGLE_MAPS_KEY)
            .then(resp => {
                console.log(resp)
                if(resp.data.results.length > 0){
                    console.log("passsed")

                    const room = {
                        shoplng:this.props.restaurant.location.lng,
                        shoplat:this.props.restaurant.location.lat,
                        lng:resp.data.results[0].geometry.location.lng,
                        lat:resp.data.results[0].geometry.location.lat,
                        name:JSON.parse(Cookie.get("login")).fullName,
                        gid:this.props.restaurant.id,
                        orders:[JSON.parse(Cookie.get("login")).fullName].concat(this.state.orderValues)

                    }
                    console.log(room)
                    axios.post("http://localhost:5000/rooms/join",room)
                        .then(res=>{
                            console.log(res)
                            console.log("kys")
                            Cookie.set("room",res.data)
                            this.setState({
                                redirect:true
                            })
                        })
                        .catch(err=>{
                            console.log(err)
                            console.log("kms")
                        })

                }
                
            })

        Cookie.set("room",{orderValues:this.state.orderValues,})
        this.setState({
            visible: false,
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