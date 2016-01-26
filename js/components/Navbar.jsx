import React from 'react';
import RegisterForm from './RegisterForm.jsx';
import LoginForm from './LoginForm.jsx';
import {LoginError, RegisterError} from '../util/alerts';
import API from '../API';
import {store} from '../util/store';
import init from '../util/init';
import {parseToken} from '../util/authorization';
import {eventEmitter} from '../util/store';

function hideLoginRegisterLogoutUsername(login, register, logout, username) {
  login    ? $('#Login').hide()    : $('#Login').show();
  register ? $('#Register').hide() : $('#Register').show();
  logout   ? $('#Logout').hide()   : $('#Logout').show();
  if (username) {
    let payload = parseToken(store.getDatum('token'));
    $('#username').text(payload.username);
    $('#welcome').show();
  } else {
    $('#welcome').hide();
  }
}

function clearInput() {
  ['userNameLogin', 'passwordLogin', 'userNameRegister', 'passwordRegister', 'passwordRegister2']
  .forEach(input => $(`#${input}`).val(''));
}

class Navbar extends React.Component {
  componentDidMount() {
    if (init()) {
      hideLoginRegisterLogoutUsername(true, true, false, true);
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
      hideLoginRegisterLogoutUsername(true, true, false, true);
    })
    .fail(err => LoginError(err.responseText));
  }
  register(newUserInfo) {
    API.register(newUserInfo)
    .done(token => {
      clearInput();
      localStorage.setItem('token', token);
      store.saveDatum('token', token);
      hideLoginRegisterLogoutUsername(true, true, false, true);
    })
    .fail(err => RegisterError(err.responseText));
  }
  logout() {
    localStorage.removeItem('token');
    store.saveDatum('me', null);
    store.saveDatum('token', null);
    hideLoginRegisterLogoutUsername(false, true, true, false);
  }
  goHome(e) {
    e.preventDefault();
    eventEmitter.emitChange('goHome');
  }
  render() {
    return (
      <div>
        <div id="goHome" onClick={this.goHome}></div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div className="navbar-brand">
                <div className="btn-round">
                      <div className='braket-logo'>
                          &lt;&gt;
                     </div>
                  </div>
                  <span className="startCodingName">Start Coding</span>
              </div>


            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
              <ul id="welcome" className="nav navbar-nav navbar-left">
              </ul>
              <ul id="Login" className="nav navbar-nav">
                <li><LoginForm login={this.login.bind(this)} /></li>
                <li><a href="#" onClick={this.showRegister.bind(this)}>New here? <strong>Register!</strong></a></li>
                <li><a id="forgotPassword" href="https://vast-sierra-7757.herokuapp.com/forgotPassword">Forgot Password? </a></li>
              </ul>
              <ul id="Register" className="nav navbar-nav navbar-left">
                <li><RegisterForm register={this.register.bind(this)} /></li>
                <li><a href="#" className="alreadyMember" onClick={this.showLogin.bind(this)}>Already a member? <strong>Log in!</strong></a></li>
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
