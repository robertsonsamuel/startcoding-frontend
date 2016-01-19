import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';


$(document).ready(function () {
  
  $('#loginForm').submit(function(event) {
    event.preventDefault();
    let username = $('#userNameLogin').val();
    let password = $('#passwordLogin').val();
    let password2 = $('#passwordLogin').val();

    console.log(username, password);
    $.post('https://vast-sierra-7757.herokuapp.com/users/login',{
      username: username,
      password: password,
    }).done(function (token) {
      localStorage.setItem('token',token)
    }).fail(function (err) {
      console.log(err);
    })
  });

});


ReactDOM.render(<Navbar />, document.getElementById('navbar'));

console.log('im being compiled or translated');
