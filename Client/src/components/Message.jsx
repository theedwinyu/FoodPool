import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from "react-router-dom"

class Message extends Component {
    render(){
        const {
            message
        } = this.props;

        return (
            <h1>{message}</h1>
        )
    }
}

Message.defaultProps = {
    message: '',
};

Message.propTypes = {
    message: PropTypes.string,
};

const mapStateToProps = (state) => {
    const {
        message,
    } = state.default;

    return {
        message,
    };
};

export default withRouter(connect(mapStateToProps)(Message));