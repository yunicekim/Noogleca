import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import {getCurrentUser } from '../util/APIUtils';
import {ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import { styled } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import {JobListComponent, CreateJobComponent} from '../job';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false,
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // this.loadJobLists = this.loadJobLists.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
            authenticated: true,
            loading: false
          });
        }).catch(error => {
      this.setState({
        loading: false
      });
    });
  }


  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
    // this.loadJobLists();
    console.log("App.js의 State 표시: " + this.state.jobLists);
  }

  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }
    console.log("앱.js"+ this.state.authenticated);
    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Profile}></PrivateRoute>

            <PrivateRoute path="/job/createjob" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={CreateJobComponent}> ></PrivateRoute>
            <PrivateRoute path="/job" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={JobListComponent}> ></PrivateRoute>

            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} onLogin={this.loadCurrentlyLoggedInUser} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export const PinkButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 70%, #FF8E53 95%)',
  border: 0,
  borderRadius: 5,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default withRouter(App);
