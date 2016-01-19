import React from 'react';

class LoginForm extends React.Component{
  render(){
    return(
      <div>
        <form id="loginForm" className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input id="userNameLogin" refs="username" type="text" className="form-control" placeholder="Username" />
            <input id="passwordLogin" refs="password" type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default">Login</button>
        </form>
      </div>
    )
  }
}



export default LoginForm;
