import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';

class Navbar extends Component {

    

    render() {
       const  logOut=(e) =>{
            e.preventDefault()
            localStorage.removeItem('usertoken');
            this.props.history.push(`/`);
            NotificationManager.success('Successfully Logout', 'Successful!')
        }

        const loginLink = (
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/">Welcome <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/u/login">Login <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/u/register"> Register <span class="sr-only">(current)</span></a>
                </li>

            </ul>

        )
        const userLink = (
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/u/home">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href={"/notes/u/per-user/"+localStorage.getItem('id')}>Auth UserNote <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i> Profile </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-cyan" aria-labelledby="navbarDropdownMenuLink-4">
                        <a class="dropdown-item" href="#">My account</a>
                        <a class="dropdown-item" href="" onClick={logOut} >
                            Log out
                        </a>
                    </div>
                </li>
            </ul>

        )

        return (
            <div class="container">
                <nav class="mb-4 navbar navbar-expand-lg fixed-top navbar-dark cyan">
                    <a class="navbar-brand font-bold" href="/"><b>NOTE APP</b></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
                        {localStorage.usertoken ? userLink : loginLink}
                    </div>
                </nav>
            </div>

        )
    }
}

export default Navbar;