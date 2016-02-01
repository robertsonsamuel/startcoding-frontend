import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner.jsx';
import {store} from '../util/store';
import {genErr, LoginError, RegisterError} from '../util/alerts';
import {parseToken} from '../util/authorization';
import {MAX_USERNAME_LENGTH, MAX_PASSWORD_LENGTH} from '../util/CONST.js';


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoginModal.jsx';
    this.state = {
      loading: false,
      registerUsername: '',
      registerEmail: '',
      registerPassword: '',
      registerPassword2: ''
    };
  }

  resetModalAfterSuccess() {
    this.refs.loginUsername.value = '';
    this.refs.loginPassword.value = '';
    
    this.setState({
      registerUsername: '',
      registerEmail: '',
      registerPassword: '',
      registerPassword2: ''
    });

    $('#loginRegister').hide();
    $('#Logout').show();
    $('#LoginModal').modal('hide');
    let payload = parseToken(store.getDatum('token'));
    $('#username').text(payload.username);
    $('#welcome').show();
    setTimeout(() => $('#loginRegisterForms').show(), 1000);
  }

  login(e) {
    e.preventDefault();

    this.setState({ loading: true });
    $('#loginRegisterForms').hide();

    API.login({
      username: this.refs.loginUsername.value,
      password: this.refs.loginPassword.value
    })
    .done(token => {
      (this.resetModalAfterSuccess.bind(this))();
      window.location.hash = '#/all';
    })
    .fail(err => LoginError(err.responseText))
    .always(() => {
      this.setState({ loading: false })
      $('#loginRegisterForms').show();
    });
  }

  register(e) {
    e.preventDefault();

    if (this.state.registerPassword !== this.state.registerPassword2) {
      genErr('Passwords Must Match');
      return;
    }

    this.setState({ loading: true });
    $('#loginRegisterForms').hide();

    API.register({
      username: this.state.registerUsername,
      email: this.state.registerEmail,
      password: this.state.registerPassword,
      password2: this.state.registerPassword2
    })
    .done(token => {
      window.location.hash = '#/all';
      (this.resetModalAfterSuccess.bind(this))();
    })
    .fail(err => RegisterError(err.responseText))
    .always(() => {
      this.setState({ loading: false })
      $('#loginRegisterForms').show();
    });
  }

  handleUsernameChange(e) {
    let trimmed = e.target.value.replace(/\s/g, '');
    if (trimmed.length > MAX_USERNAME_LENGTH) {
      let allowedText = trimmed.slice(0, MAX_USERNAME_LENGTH);
      this.setState({ registerUsername: allowedText });
    } else {
      this.setState({ registerUsername: trimmed });
    }
  }

  handleEmailChange(e) {
    this.setState({ registerEmail: e.target.value });
  }

  handlePasswordChange(e) {
    if (e.target.value.length > MAX_PASSWORD_LENGTH) {
      let allowedText = e.target.value.slice(0, MAX_PASSWORD_LENGTH);
      this.setState({ registerPassword: allowedText });
    } else {
      this.setState({ registerPassword: e.target.value });
    }
  }

  handlePassword2Change(e) {
    this.setState({ registerPassword2: e.target.value });
  }

  render() {
    return (
      <div className="modal fade" id="LoginModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">

              <div className="row" id="loadingSpinner">
                {this.state.loading ? <LoadingSpinner /> : []}
              </div>

              <div className="row" id="loginRegisterForms">
                <div className="col-xs-12 col-sm-6">
                  <h1>Login</h1>
                  <form onSubmit={this.login.bind(this)}>
                    <input className="form-control" ref="loginUsername" type="text" placeholder="Username" required/><br/>
                    <input className="form-control" ref="loginPassword" type="password" placeholder="Password" required/><br/>
                    <button type="submit" className="form-control btn btn-primary">Log In</button>
                  </form>
                  <br/>
                  <span className="forgotPassword"><a href="https://protected-river-69772.herokuapp.com/forgotpassword" target="_blank">Forgot Password ?</a></span>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <h1>Register</h1>
                  <form onSubmit={this.register.bind(this)}>
                    <input className="form-control" value={this.state.registerUsername} onChange={this.handleUsernameChange.bind(this)} type="text" placeholder="Username" required/><br/>
                    <input className="form-control" value={this.state.registerEmail} onChange={this.handleEmailChange.bind(this)} type="email" placeholder="Email" required/><br/>
                    <input className="form-control" value={this.state.registerPassword} onChange={this.handlePasswordChange.bind(this)} type="password" placeholder="Password" required/><br/>
                    <input className="form-control" value={this.state.registerPassword2} onChange={this.handlePassword2Change.bind(this)} type="password" placeholder="Retype Password" required/><br/>
                    <button type="submit" className="form-control btn btn-primary">Register</button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginModal;
