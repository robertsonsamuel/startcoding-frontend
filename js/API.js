let apiUrl = 'https://protected-river-69772.herokuapp.com';
// let apiUrl = 'http://localhost:3000';

import {canHazToken, parseToken} from './util/authorization';
import {store} from './util/store';

function setAuthHeader(xhr) {
  let token = store.getDatum('token');
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
}

let API = {
  register(newUserInfo) {
    return $.post(`${apiUrl}/users/register`, newUserInfo);
  },
  login(userInfo) {
    return $.post(`${apiUrl}/users/login`, userInfo)
    .done( resp => {
      localStorage.setItem('token', resp);
      store.saveDatum('token', resp);
    });
  },
  getMyInfo() {
    let token = store.getDatum('token');
    if (!token) return;
    let payload = parseToken(token);
    $.ajax({
      url: `${apiUrl}/users/${payload.id}`,
      type: 'GET',
      beforeSend: setAuthHeader
    })
    .done( resp => {
      store.saveDatum('me', resp);
    })
  },
  getResources() {
    return $.get(`${apiUrl}/resources/`);
  },
  postResource(title, body) {
    return $.ajax({
      url: `${apiUrl}/resources/`,
      type: 'POST',
      beforeSend: setAuthHeader,
      datatype: 'json',
      data: {
        title: title,
        body: body
      }
    });
  },
  getComments(resourceId) {
    return $.ajax({
      url: `${apiUrl}/comments/${resourceId}`,
      type: 'GET',
      beforeSend: setAuthHeader
    });
  },
  postComment(parentId, body, seed) {
    let query = seed ? '?seed=true' : '';
    return $.ajax({
      url: `${apiUrl}/comments/${parentId + query}`,
      type: 'POST',
      beforeSend: setAuthHeader,
      datatype: 'json',
      data: {body: body}
    });
  },
  updateComment(commentId, body) {
    return $.ajax({
      url: `${apiUrl}/comments/${commentId}`,
      type: 'PUT',
      beforeSend: setAuthHeader,
      datatype: 'json',
      data: {body: body}
    });
  },
  deleteComment(commentId) {
    return $.ajax({
      url: `${apiUrl}/comments/${commentId}`,
      type: 'DELETE',
      beforeSend: setAuthHeader
    });
  },
  vote(commentId, vote){
    return $.ajax({
      url: `${apiUrl}/comments/vote/${commentId}`,
      type: 'POST',
      beforeSend: setAuthHeader,
      datatype: 'json',
      data: {vote: vote}
    })
  }
};

//listeners
store.registerListener('token', API.getMyInfo);

export default API;
