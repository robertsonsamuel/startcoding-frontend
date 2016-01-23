let apiUrl = 'https://vast-sierra-7757.herokuapp.com';
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
      resp.greenTopics = new Set(resp.greenTopics);
      store.saveDatum('me', resp);
    })
  },
  getTopics() {
    return $.get(`${apiUrl}/topics/`);
  },
  postTopic(title, body) {
    return $.ajax({
      url: `${apiUrl}/topics/`,
      type: 'POST',
      beforeSend: setAuthHeader,
      datatype: 'json',
      data: {
        title: title,
        body: body
      }
    });
  },
  getComments(topicId) {
    let me = store.getDatum('me');
    if (me) {
      me.greenTopics.add(topicId);
      store.saveDatum('me', me);
    };
    return $.ajax({
      url: `${apiUrl}/comments/${topicId}`,
      type: 'GET',
      beforeSend: setAuthHeader
    })
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
};

//listeners
store.registerListener('token', API.getMyInfo);

export default API;
