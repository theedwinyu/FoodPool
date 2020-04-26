import React, { Component } from 'react';

import { Card, Row, Col, Divider, Spin } from 'antd';
import newLogo from '../assets/newLogo.png';
import Chatroom from './Chatroom';

import { withRouter } from "react-router-dom"
import axios from 'axios'

import io from 'socket.io-client'
import Cookie from 'js-cookie'

class Room extends Component {

    state = {
        orders:[],
        users:[],
        shoplng:null,
        shoplat:null,
        lng:null,
        lat:null,
        gid:null,
        roomid:null,
        socket:null,
        comments:[],
    }

    componentDidMount(){
        const socket = io("http://localhost:5000")
        console.log("kakakakak")
        console.log(JSON.parse(Cookie.get("room")))
        console.log("kakakakak")
        const croomid = JSON.parse(Cookie.get("room")).roomid
        const cuser = JSON.parse(Cookie.get("room")).myuinfo
        const corder = JSON.parse(Cookie.get("room")).myOrder
        socket.emit("joinroom",croomid)
        socket.emit("joinnotif",croomid,cuser,corder)
        socket.on("joinnotif",(user,order)=>{
            console.log(cuser)
            if(user != cuser){
                console.log("FUCK ME")
                console.log(this.state.orders)
                console.log(user)
                console.log(order)
                this.setState({
                    orders:[...this.state.orders,order],
                    users:[...this.state.users,user]
                })
            }
        })
    
        this.setState({
            socket:socket
        })
        const arg = {roomid:JSON.parse(Cookie.get("room")).roomid}
        console.log(arg)
        axios.post("http://localhost:5000/rooms/get",arg)
        .then(res=>{
            console.log("FUCKING FUCK WHAT THE TRFUCFVKL")
            console.log(res)
            this.setState({
                orders:res.data.orders,
                users:res.data.users,
                shoplng:res.data.shoplng,
                shoplat:res.data.shoplat,
                lng:res.data.lng,
                lat:res.data.lat,
                gid:res.data.gid,
                roomid:res.data.roomid,
            })
        })

    }


    render(){

        const restaurant = JSON.parse(JSON.parse(Cookie.get('room')).restaurant);

        const {
            socket,
        } = this.state;
        if(!socket) {
            return <Spin></Spin>
        }
        return(
            <div className="App" >
                <h3>{"ro "+JSON.stringify(this.state.orders)}</h3>
                <h3>{"rus "+JSON.stringify(this.state.users)}</h3>
                <h3>{"rsln "+JSON.stringify(this.state.shoplng)}</h3>
                <h3>{"rsla "+JSON.stringify(this.state.shoplat)}</h3>
                <h3>{"rln "+JSON.stringify(this.state.lng)}</h3>
                <h3>{"rla "+JSON.stringify(this.state.lat)}</h3>
                <h3>{"rgid "+JSON.stringify(this.state.gid)}</h3>
                <h3>{"rid "+JSON.stringify(this.state.roomid)}</h3>
                <h3>{"rcmts "+JSON.stringify(this.state.comments)}</h3>
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
                                        <Chatroom shopLoc={{lat: this.state.shoplat, lng: this.state.shoplng}} roomUsers={this.state.users} orders={this.state.orders} socket={this.state.socket} restaurant={restaurant} roomId={this.state.roomid} name={Cookie.getJSON('login').fullName}/>
                                        
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