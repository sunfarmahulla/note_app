import React, { Component} from 'react';
import {withRouter} from 'react-router-dom';
class Home extends Component {

    render() {
        return (
            <div className="container">
                <div className="alert alert-success">
                    Home
                </div>
            </div>
        )
    }
}
export default withRouter(Home);