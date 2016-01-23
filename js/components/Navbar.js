import React from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import {LoginError, RegisterError} from '../util/alerts';
import API from '../API';
import {eventEmitter} from '../util/store'

function hideLoginRegisterLogoutUsername(login, register, logout, username) {
  login    ? $('#Login').hide()    : $('#Login').show();
  register ? $('#Register').hide() : $('#Register').show();
  logout   ? $('#Logout').hide()   : $('#Logout').show();
  if (username) {
    $('#username').text(retrieveToken().username);
    $('#welcome').show();
  } else {
    $('#welcome').hide();
  }
}

function retrieveToken() {
  let token = localStorage.getItem('token');
  return token ? JSON.parse(atob(token.split('.')[1])) : false;
}

function clearInput() {
  ['userNameLogin', 'passwordLogin', 'userNameRegister', 'passwordRegister', 'passwordRegister2']
  .forEach(input => $(`#${input}`).val(''));
}

class Navbar extends React.Component {
  componentDidMount() {
    // check for a token and display logged-in state if a valid token exists
    let tokenPayload = retrieveToken();
    if (!tokenPayload) return;
    if (Date.now() < tokenPayload.exp * 1000) {
      hideLoginRegisterLogoutUsername(true, true, false, true);
    } else {
      localStorage.removeItem('token');
    }
  }
  showRegister() {
    hideLoginRegisterLogoutUsername(true, false, true, false);
  }
  showLogin() {
    hideLoginRegisterLogoutUsername(false, true, true, false);
  }
  login(userInfo) {
    API.login(userInfo)
    .done(token => {
      clearInput();
      localStorage.setItem('token', token);
      eventEmitter.emitChange('login');
      hideLoginRegisterLogoutUsername(true, true, false, true);
    })
    .fail(err => LoginError(err.responseText));
  }
  register(newUserInfo) {
    API.register(newUserInfo)
    .done(token => {
      clearInput();
      localStorage.setItem('token', token);
      eventEmitter.emitChange('login')
      hideLoginRegisterLogoutUsername(true, true, false, true);
    })
    .fail(err => RegisterError(err.responseText));
  }
  logout() {
    localStorage.removeItem('token');
    eventEmitter.emitChange('logout');
    hideLoginRegisterLogoutUsername(false, true, true, false);
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div className="navbar-brand" href="#">
                <div className="btn-round">
                      <div className='leaf-logo'>
                        <div className='leaf-shadow'>
                        </div>
                     </div>
                  </div>
                  <span className="greenItName">Green it!</span>
              </div>


            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
              <ul id="welcome" className="nav navbar-nav navbar-left">
              </ul>
              <ul id="Login" className="nav navbar-nav">
                <li><LoginForm login={this.login.bind(this)} /></li>
                <li><a href="#" onClick={this.showRegister.bind(this)}>New here? <strong>Register!</strong></a></li>
              </ul>
              <ul id="Register" className="nav navbar-nav">
                <li><RegisterForm register={this.register.bind(this)} /></li>
                <li><a href="#" onClick={this.showLogin.bind(this)}>Already a member? <strong>Log in!</strong></a></li>
              </ul>
              <ul id="Logout" className="nav navbar-nav navbar-right">
                <li><a href="#">Hello, <span id="username"></span></a></li>
                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}


export default Navbar;
