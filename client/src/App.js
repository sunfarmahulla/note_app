import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from '../src/components/Navbar';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import Home from '../src/components/auth/Home';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Login} />
          <div className="conatiner">
            <Route extact path="/u/login" component={Login}/>
            <Route extact path="/u/register" component={Register}/>
            <Route extact path="/u/home" component={Home}/>

          </div>
          <NotificationContainer />
        </div>
      </Router>
    );
  }
}

export default App;
