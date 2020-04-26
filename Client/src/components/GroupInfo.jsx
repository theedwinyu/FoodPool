import React, { Component } from 'react';

import { List, Collapse, Card } from 'antd';

const { Panel } = Collapse;

class GroupInfo extends Component {

    render (){
        const {
            orders
        } = this.props;
        return (
            <Card style={{backgroundColor: '#A4D4AE', borderRadius: '7px', height: '80vh'}}>
                <h2 style = {{marginBottom: '30px'}}>Everyone's Orders</h2>
                <Collapse defaultActiveKey={['1']}>
                    {
                        orders.map(item => {
                            const [name, ...allOrders] = item;
                            return (
                                <Panel header={name} key={name}>
                                    <p>{allOrders}</p>
                                </Panel>
                            )
                        })
                    }
                    {/* <Panel header="This is panel header 1" key="1">
                    <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                    <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3" disabled>
                    <p>{text}</p>
                    </Panel> */}
                </Collapse>
                {/* <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={orders}
                renderItem={item => {
                    const [name, ...allOrders] = item;
                    return (
                        <List.Item>
                        <div>
                        <p>{name}</p>
                        <p>{allOrders}</p>
                        </div>
                        </List.Item>
                    )
                }}
                /> */}
            </Card>
           
        )
    }
}

export default GroupInfo;