import React, { Component } from 'react';

import { Comment, Avatar, Form, Button, List, Input, Empty ,Typography, Card, Divider, Row, Col } from 'antd';
import moment from 'moment';
import axios from 'axios';

import Map from './Map';
import GroupInfo from './GroupInfo';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const {Text} = Typography

const CommentList = ({ comments, title }) => (
    <div>
        <h2>Chatroom for {title}</h2>
        <Card>
        <List
            dataSource={comments}
            itemLayout="horizontal"
            renderItem={props => 
                <Comment {...props} />
            }
            style={{overflowY:'scroll', height: '50vh', marginBottom: '10%'}}
        />
        </Card>
        
    </div>
    
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div >
        <Row>
        <Col span={16}>
        <Form.Item>
        <Input onChange={onChange} value={value} placeholder="Send a message!" style={{borderRadius: '12px'}}/>
        </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="default" style={{borderRadius: '12px'}}>
            Enter
        </Button>
        </Form.Item>
        </Col>
        </Row>
        
    </div>
);

class Chatroom extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
        }
    }

    componentDidMount(){
        const myName = this.props.name;
        const socket = this.props.socket;
        // socket.on("newMessage", (name, message) => {
        //     if(name !== myName){
        //         this.setState({
        //             comments: [
        //                 {
        //                 author: name,
        //                 content: <p>{message}</p>,
        //                 datetime: moment().format('LLLL'),
        //                 },
        //                 ...this.state.comments,
        //             ]
        //         })
        //     }
        // }) 

        socket.on("newMessage",(name,message)=>{
            console.log(name, myName, message);
            if (name !== myName){
                console.log(myName, name, message);
                this.setState({
                    comments: [
                        {
                            author: name,
                            content: <Card style={{borderRadius: '12px'}}><p>{message}</p></Card>,
                            style: this.formatStyle(true),
                        },
                        ...this.state.comments,
                    
                    ],
                })
            }
            
        })

    }

    formatMessage = (message,name,formatLeft) => {
        const style = {
            marginLeft: formatLeft ? '0%' : '50%',
            width:'50%',
            borderRadius: '12px',
        }
        console.log(style.alignItems);
        return <Card title={name} style={style}><p>{message}</p></Card>
    }

    formatStyle = (formatLeft) => {
        return {
            marginLeft: formatLeft ? '0%' : '50%',
            width: '50%',
        }
    }

    handleSubmit = () => {
        const { name, socket, roomId } = this.props;

        if (!this.state.value) {
            return;
        }

        console.log(roomId);
        socket.emit("sentComment",roomId,name,this.state.value)

        this.setState({
            comments: [
                {
                    author: name,
                    content: <Card style={{borderRadius: '12px'}}><p>{this.state.value}</p></Card>,
                    style: this.formatStyle(false),
                },
                ...this.state.comments,
            ]
        });

        const question = {
            question: this.state.value
        }

        console.log(question);

    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render(){
        const {
            restaurant,
            orders,
            shopLoc,
            roomUsers,
            distance,
            name,
        } = this.props;
        console.log(restaurant)
        const { comments, submitting, value } = this.state;
        return (
            <div>
                <Card style={{borderRadius: '12px', backgroundColor: '#F9DE92'}}>
                <Row>
                    <Col span={6}>
                        <GroupInfo orders={orders}/>
                    </Col>
                    <Col span={1}/>
                    <Col span={10}>
                        {<CommentList comments={comments} title={restaurant.title} />}

                        <Comment
                        author={this.props.name}
                        content={
                            <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                            />
                        }
                        />
                    </Col>
                    <Col span={1}/>
                    <Col span={6}>
                        <Row>
                            <Map shopLoc={shopLoc} roomUsers={roomUsers}/>
                        </Row>
                        <Row>
                            <Col style={{backgroundColor:'white',  color:'black'}} >
                                <Card title = "Route details">
                                    <p>Shortest Possible Route distance: {distance} miles</p>
                                    <p>Driver: {name}</p>
                                </Card>
                            </Col>

                        </Row>
                    </Col>
                </Row>
                
                </Card>
            </div>
        );
    }
}

Chatroom.defaultProps = {
    distance: null,
    name: '',
};

Chatroom.propTypes = {
    distance: PropTypes.number,
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    const {
        distance,
        message,
    } = state.default;

    return {
        distance,
        name: message,
    };
};
  
export default connect(mapStateToProps)(Chatroom);