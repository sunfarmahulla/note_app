import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Redirect} from 'react-router-dom';
import './App.css';

import Navbar from '../src/components/Navbar';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import Home from '../src/components/auth/Home';
import Welcome from '../src/components/welcome';
import ReadNote from '../src/components/note/ReadNote';
import UserNote from '../src/components/note/UserNote';
import UpdateNote from '../src/components/note/UpdateNote';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { NotificationManager} from 'react-notifications';
class App extends Component {
  render() {
    const checkAuth =() =>{
      const token =localStorage.getItem('usertoken');
      if(!token){
        NotificationManager.error('Sorry you can not access this page please login! ', 'Error!');
        return false;
      }


      return true;
    }
    const AuthRoute = ({component: Component, ...rest})=> {
      return (
        <Route
          {...rest}
          render={(props) =>checkAuth() === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/u/login'}} />
          
          }
        />
      )
    }
    
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Welcome} />
          <div className="conatiner">
            <Route extact path="/u/login" component={Login}/>
            <Route extact path="/u/register" component={Register}/>
            <Route extact path="/notes/get/:id" component={ReadNote}/>
            <AuthRoute extact path="/u/home" component={Home}/>
            <AuthRoute extact path="/notes/u/per-user/:id" component={UserNote}/>
            <AuthRoute extact path="/notes/update/:id" component={UpdateNote}/>
          </div>
          <NotificationContainer />
        </div>
      </Router>
    );
  }
}

export default App;
