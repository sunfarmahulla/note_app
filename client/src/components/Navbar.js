import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
class Navbar extends Component {

    render() {
        return (
            <div className="container">
                <nav className="mb-4 navbar navbar-expand-lg fixed-top navbar-dark cyan">
                <a className="navbar-brand font-bold" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/u/login">Login <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/u/register"> Register <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i> Profile </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-cyan" aria-labelledby="navbarDropdownMenuLink-4">
                                <a className="dropdown-item" href="#">My account</a>
                                <a className="dropdown-item" href="#">Log out</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            </div>
            
        )
    }
}

export default withRouter(Navbar);