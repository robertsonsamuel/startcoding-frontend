import React from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

class Navbar extends React.Component{
  showRegister(){
    $('#Login').hide();
    $('#Register').show();
  }
  showLogin(){
    $('#Login').show();
    $('#Register').hide();
  }
  render(){
    return(
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
            <li><LoginForm /></li>
            <li><a href="#" onClick={this.showRegister.bind(this)}>New here? <strong>Register!</strong></a></li>
          </ul>
          <ul id="Register" className="nav navbar-nav">
            <li><RegisterForm /></li>
            <li><a href="#" onClick={this.showLogin.bind(this)}>Already a member? <strong>Log in!</strong></a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
    )
  }
}


export default Navbar;
