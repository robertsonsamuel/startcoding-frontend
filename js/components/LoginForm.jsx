import React from 'react';

class LoginForm extends React.Component{
  login(e) {
    e.preventDefault();
    this.props.login({
      username: this.refs.username.value,
      password: this.refs.password.value
    });
  }
  render() {
    return(
      <div className="col-md-12">
        <form id="loginForm" className="navbar-form navbar-left" >
          <div className="form-group">
            <input id="userNameLogin" ref="username" type="text" className="form-control" placeholder="Username" />
            <input id="passwordLogin" ref="password" type="password" className="form-control" placeholder="Password" />
          </div>
          <button onClick={this.login.bind(this)} className="btn btn-danger">Log In</button>
        </form>
      </div>
    )
  }
}

export default LoginForm;
