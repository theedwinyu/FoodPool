import React, { Component } from 'react';

import { List } from 'antd';

class GroupInfo extends Component {

    render (){
        const {
            orders
        } = this.props;
        return (
            <List
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
            />
        )
    }
}

export default GroupInfo;