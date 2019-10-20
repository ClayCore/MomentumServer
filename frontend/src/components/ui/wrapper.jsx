import React, { Component } from 'react';
import MobileCheck from './mobileCheck';
import Loader from './loader';

class Wrapper extends Component {
    render() {
        return (
            <div id="wrapper">
                <MobileCheck />
                <Loader />
                {this.props.children}
            </div>
        );
    }
}

export default Wrapper;
