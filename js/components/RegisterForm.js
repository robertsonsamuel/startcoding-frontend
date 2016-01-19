import React from 'react';

class RegisterForm extends React.Component{
  render(){
    return(
      <div>
        <form id="registerForm" className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input id="userNameRegister" refs="username" type="text" className="form-control" placeholder="Username" />
            <input id="passwordRegister" refs="password" type="password" className="form-control" placeholder="Password" />
            <input id="passwordRegister2" refs="password2" type="password" className="form-control" placeholder="Confirm Password" />
          </div>
          <button type="submit" className="btn btn-danger">Register</button>
        </form>
      </div>
    )
  }
}



export default RegisterForm;
