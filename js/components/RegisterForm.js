import React from 'react';

class RegisterForm extends React.Component {
  register(e) {
    e.preventDefault();
    this.props.register({
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password2: this.refs.password2.value
    });
  }
  render(){
    return(
      <div>
        <form action="" method="" id="registerForm" className="form-inline">
          <div className="form-group">
            <input id="userNameRegister" ref="username" type="text" className="form-control" placeholder="Username" required  />
            <input id="emailRegister" ref="email" type="email" name="email" className="form-control" placeholder="Email"  required />
            <input id="passwordRegister" ref="password" type="password" className="form-control" placeholder="Password" required/>
            <input id="passwordRegister2" ref="password2" type="password" className="form-control" placeholder="Confirm Password" required/>
          </div>
          <button type="submit" onClick={this.register.bind(this)} className="btn btn-danger">Register</button>
        </form>
      </div>
    )
  }
}


export default RegisterForm;
