import React from 'react';
import RegisterForm from './RegisterForm.jsx';
import LoginModal from './LoginModal.jsx';
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
      $('#loginRegister').hide();
    }
  }
  showRegister() {
    hideLoginRegisterLogoutUsername(true, false, true, false);
  }
  showLogin() {
    hideLoginRegisterLogoutUsername(false, true, true, false);
  }
  toProfile(){
    console.log("going to profile!!");
  }
  logout() {
    localStorage.removeItem('token');
    store.saveDatum('me', null);
    store.saveDatum('token', null);
    hideLoginRegisterLogoutUsername(false, true, true, false);
    $('#loginRegister').show();
  }
  goMain(e) {
    e.preventDefault();
    window.location.hash = '#/all'
    eventEmitter.emitChange('goMain');
  }
  goUser(e) {
    e.preventDefault();
    window.location.hash = '#/user/' + (store.getDatum('me') ? store.getDatum('me')._id : '')
    eventEmitter.emitChange('goUser');
  }
  render() {
    let categoryStyle = this.props.category + 'Style';
    console.log("categoryStyle", categoryStyle);
    let navBarClasses = "navbar " + "navbar-inverse " + categoryStyle;
    return (
      <div id="topBar">
        <LoginModal />
        <div id="goMain" onClick={this.goMain}></div>
        <nav className={navBarClasses}>
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
              <ul id="" className="nav navbar-nav navbar-left">
              </ul>
              <ul id="loginRegister" className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" data-toggle="modal" data-target="#LoginModal">
                    <strong>Login / Register</strong>
                  </a>
                </li>
              </ul>
              <ul id="Logout" className="nav navbar-nav navbar-right">
                <li><a href='' id="userBtn" onClick={this.goUser.bind(this)}><span id="username"></span></a></li>
                <li><a href='' id="logoutBtn" onClick={this.logout.bind(this)}>Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}


export default Navbar;
