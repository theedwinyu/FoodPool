import React, { Component } from 'react';

import { List } from 'antd';
import { DollarOutlined, StarOutlined } from '@ant-design/icons';

import OrderModal from './OrderModal';

class RestaurantList extends Component {

    render() {
        const {
            nearbyResults,
        } = this.props;
        console.log(nearbyResults);

        // const photos = nearbyResults.map(res => 
        //     "https://maps.googleapis.com/maps/api/place/photo?maxwidth=272&photoreference="+res.photos[0].photo_reference+"&key=" + process.env.REACT_APP_GOOGLE_MAPS_KEY
        // );
        // console.log(photos);

        const listData = nearbyResults.map((res,index) => {
            return {
                title: res.name,
                formatted_address: res.formatted_address,
                price_level: res.price_level,
                rating: res.rating,
                // picture: photos[index],
                open_now: res.business_status === 'OPERATIONAL' && res.opening_hours ? res.opening_hours.open_now : false,
                id: res.id,
                location: res.geometry.location,
            }
        })

        const IconText = ({ icon, text }) => (
            <span>
              {React.createElement(icon, { style: { marginRight: 8 } })}
              {text}
            </span>
        );

        console.log(listData);

        return (
            
            <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={listData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                    <IconText icon={StarOutlined} text={item.rating} key="rating" />,
                    <IconText icon={DollarOutlined} text={item.price_level} key="price_level" />
                  ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    // src={item.picture}
                  />
                }
              >
                <List.Item.Meta
                  title={<b>{item.title}</b>}
                  formatted_address={item.formatted_address}
                />
                {item.open_now ? 'Open Now!' : 'Closed for now'}
                <br></br>
                <br></br>
                <OrderModal restaurant={item}/>
                <br></br>
              </List.Item>
            )}
            />
        )
    
    }
}

export default RestaurantList;