import React from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import API from '../API';

function hideLoginRegisterLogout(login, register, logout) {
  login    ? $('#Login').hide()    : $('#Login').show();
  register ? $('#Register').hide() : $('#Register').show();
  logout   ? $('#Logout').hide()   : $('#Logout').show();
}

class Navbar extends React.Component{
  showRegister() {
    hideLoginRegisterLogout(true, false, true);
  }
  showLogin() {
    hideLoginRegisterLogout(false, true, true);
  }
  login(userInfo) {
    API.login(userInfo)
    .done(token => {
      localStorage.setItem('token', token);
      hideLoginRegisterLogout(true, true, false);
    })
    .fail(err => console.log(err));
  }
  register(newUserInfo) {
    API.register(newUserInfo)
    .done(token => {
      localStorage.setItem('token', token);
      hideLoginRegisterLogout(true, true, false);
    })
    .fail(err => console.log(err));
  }
  logout() {
    localStorage.removeItem('token');
    hideLoginRegisterLogout(false, true, true);
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
            <a className="navbar-brand" href="#">Green it!</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul id="Login" className="nav navbar-nav">
              <li><LoginForm login={this.login.bind(this)} /></li>
              <li><a href="#" onClick={this.showRegister.bind(this)}>New here? <strong>Register!</strong></a></li>
            </ul>
            <ul id="Register" className="nav navbar-nav">
              <li><RegisterForm register={this.register.bind(this)} /></li>
              <li><a href="#" onClick={this.showLogin.bind(this)}>Already a member? <strong>Log in!</strong></a></li>
            </ul>
            <ul id="Logout" className="nav navbar-nav navbar-right">
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
