import React, { Component } from 'react';

import breakfast from '../assets/filter-icons/Breakfast.png';
import chinese from '../assets/filter-icons/Chinese.png';
import fastFood from '../assets/filter-icons/fastFood.png';
import italian from '../assets/filter-icons/Italian.png';
import tacos from '../assets/filter-icons/Tacos.png';
import vegan from '../assets/filter-icons/Vegan.png';
import bakery from '../assets/filter-icons/Bakery.png';
import bread from '../assets/filter-icons/Bread.png';
import cafe from '../assets/filter-icons/Cafe.png';
import hamburger from '../assets/filter-icons/Hamburger.png';
import hotdog from '../assets/filter-icons/HotDogs.png';
import icecream from '../assets/filter-icons/icecream.png';
import pizza from '../assets/filter-icons/Pizza.png';
import steak from '../assets/filter-icons/Steak.png';
import sushi from '../assets/filter-icons/Sushi.png';

import { Row, Col, Divider, Select } from 'antd';

const { Option } = Select;

class RestaurantFilter extends Component {

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    render() {
        const {
            nearbyResults,
        } = this.props;

        return (
            <div>
                <h2>All Restaurants</h2>
                <i>{nearbyResults.length || 'None'} Nearby</i>
                <p></p>
                <Row>
                    <Col span={8}>
                        <img src={breakfast} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                    <Col span={8}>
                        <img src={chinese} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                    <Col span={8}>
                        <img src={fastFood} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                </Row>
                <p></p>
                <Row>
                    <Col span={8}>
                        <img src={italian} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                    <Col span={8}>
                        <img src={tacos} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                    <Col span={8}>
                        <img src={vegan} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                </Row>
                <p></p>
                <Row>
                    <Col span={8}>
                        <img src={bakery} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                    <Col span={8}>
                        <img src={bread} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                    <Col span={8}>
                        <img src={cafe} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                </Row>
                <p></p>
                <Row>
                    <Col span={8}>
                        <img src={hamburger} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                    <Col span={8}>
                        <img src={pizza} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                    <Col span={8}>
                        <img src={icecream} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                </Row>
                <p></p>
                <Row>
                    <Col span={8}>
                        <img src={hotdog} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                    <Col span={8}>
                        <img src={steak} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                    <Col span={8}>
                        <img src={sushi} style={{width:'30%', height: 'auto'}}/>
                    </Col>
                </Row>

                <Divider />

                <Row>
                    <Col span={8}>
                    <Select style={{ width: 120, backgroundColor: '#A4D4AE' }} onChange={this.handleChange} placeholder={'$ , $$, $$$'}>
                        <Option value="price_one">$</Option>
                        <Option value="price_two">$$</Option>
                        <Option value="price_three">$$$</Option>
                    </Select>
                    </Col>

                    <Col span={8}>
                    <Select style={{ width: 120, backgroundColor: '#A4D4AE' }} onChange={this.handleChange} placeholder={'Ratings'}>
                        <Option value="one">1</Option>
                        <Option value="two">2</Option>
                        <Option value="three">3</Option>
                        <Option value="four">4</Option>
                        <Option value="five">5</Option>
                    </Select>
                    </Col>

                    <Col span={8}>
                    <Select style={{ width: 120, backgroundColor: '#A4D4AE' }} onChange={this.handleChange} placeholder={'Open Now'}>
                        <Option value="yes">Yes</Option>
                        <Option value="no">No</Option>
                    </Select>
                    </Col>

                </Row>

            </div>
        )
    }
}

export default RestaurantFilter;