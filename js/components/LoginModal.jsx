import React from 'react';
import API from '../API';
import LoadingSpinner from './LoadingSpinner.jsx';
import {store} from '../util/store';
import {genErr, LoginError, RegisterError} from '../util/alerts';
import {parseToken} from '../util/authorization';


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoginModal.jsx';
    this.state = { loading: false };
  }

  resetModalAfterSuccess() {
    this.refs.loginUsername.value = '';
    this.refs.loginPassword.value = '';
    this.refs.registerUsername.value = '';
    this.refs.registerEmail.value = '';
    this.refs.registerPassword.value = '';
    this.refs.registerPassword2.value = '';
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
      if (!this.props.category) window.location.hash = '#/all';;
    })
    .fail(err => LoginError(err.responseText))
    .always(() => {
      this.setState({ loading: false })
      $('#loginRegisterForms').show();
    });
  }

  register(e) {
    e.preventDefault();

    if (this.refs.registerPassword.value !== this.refs.registerPassword2.value) {
      genErr('Passwords Must Match');
      return;
    }

    this.setState({ loading: true });
    $('#loginRegisterForms').hide();

    API.register({
      username: this.refs.registerUsername.value,
      email: this.refs.registerEmail.value,
      password: this.refs.registerPassword.value,
      password2: this.refs.registerPassword2.value
    })
    .done(token => {
      (this.resetModalAfterSuccess.bind(this))();
      if (!this.props.category) window.location.hash = '#/all';;
    })
    .fail(err => RegisterError(err.responseText))
    .always(() => {
      this.setState({ loading: false })
      $('#loginRegisterForms').show();
    });
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
                    <input className="form-control" ref="registerUsername" type="text" placeholder="Username" required/><br/>
                    <input className="form-control" ref="registerEmail" type="email" placeholder="Email" required/><br/>
                    <input className="form-control" ref="registerPassword" type="password" placeholder="Password" required/><br/>
                    <input className="form-control" ref="registerPassword2" type="password" placeholder="Retype Password" required/><br/>
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
