let apiUrl = 'https://vast-sierra-7757.herokuapp.com';
// let apiUrl = 'http://localhost:3000';

import {canHazToken} from './util/authorization';

function setAuthHeader(xhr) {
  let token = localStorage.getItem('token');
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
}

let API = {
  register(newUserInfo) {
    return $.post(`${apiUrl}/users/register`, newUserInfo);
  },
  login(userInfo) {
    return $.post(`${apiUrl}/users/login`, userInfo);
  },
  getTopics() {
    return $.get(`${apiUrl}/topics/`)
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
    return $.get(`${apiUrl}/comments/${topicId}`)
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

export default API;
