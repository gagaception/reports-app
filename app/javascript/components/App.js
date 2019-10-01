import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Main from './Main';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      errors: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("/login", {
        withCredentials: true
      })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.isLoggedIn === false
        ) {
          this.setState({
            isLoggedIn: true,
            user: response.data.user
          });
        } else if (
          !response.data.logged_in &
          (this.state.isLoggedIn === true)
        ) {
          this.setState({
            isLoggedIn: false,
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleSuccessfulAuth(data) {
    this.handleLogin(data);
  }

  handleLogin(data) {
    this.setState({
      isLoggedIn: true,
      user: data.user
    });
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false,
      user: {}
    });
  }

  handleLogoutClick() {
    axios
      .delete("/logout", {
        withCredentials: true
      })
      .then(response => {
        this.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return(
      <div>
        <Header 
          userLoggedIn={this.state.isLoggedIn} 
          userEmail={this.state.user} 
          logOut={this.handleLogoutClick}/>
        <Route 
          exact
          path={"/login"}
          render={props => (
            <Login
              {...props}
              handleSuccessfulAuth={this.handleSuccessfulAuth}
            />
          )}
        />
        <ProtectedRoute 
          path="/reports/:id?" 
          component={Main} 
          isLoggedIn={this.state.isLoggedIn}/>
      </div>
    )
  }
}

export default App;