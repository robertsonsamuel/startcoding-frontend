import React from 'react';

class RegisterForm extends React.Component {
  register(e) {
    e.preventDefault();
    this.props.register({
      username: this.refs.username.value,
      password: this.refs.password.value,
      password2: this.refs.password2.value
    });
  }
  render(){
    return(
      <div>
        <form id="registerForm" className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input id="userNameRegister" ref="username" type="text" className="form-control" placeholder="Username" />
            <input id="passwordRegister" ref="password" type="password" className="form-control" placeholder="Password" />
            <input id="passwordRegister2" ref="password2" type="password" className="form-control" placeholder="Confirm Password" />
          </div>
          <button onClick={this.register.bind(this)} className="btn btn-danger">Register</button>
        </form>
      </div>
    )
  }
}

export default RegisterForm;
