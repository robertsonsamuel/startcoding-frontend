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
    return $.post(`${apiUrl}/users/register`, newUserInfo)
    .done( resp => {
      localStorage.setItem('token', resp);
      store.saveDatum('token', resp);
    });;
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
      resp.upvotes = new Set(resp.upvotes);
      resp.downvotes = new Set(resp.downvotes);
      resp.savedResources = new Set(resp.savedResources);
      store.saveDatum('me', resp);
    })
  },
  getResourceById(id) {
    return $.get(`${apiUrl}/resources/one/${id}`);
  },
  getResources(category, tags) {
    let query = tags && tags.length ? `?tags=${tags.join()}` : '';
    return $.get(`${apiUrl}/resources/${category + query}`)
    .done((data) => {
      store.saveDatum('resources', data.resources);
    });
  },
  getAllTags() {
    return $.get(`${apiUrl}/tags`)
    .done((allTags) => {
      store.saveDatum('allTags', allTags);
    })
    .fail(err => console.log(err));
  },
  postResourceVote(resourceId, vote){
    return $.ajax({
      url: `${apiUrl}/resources/vote/${resourceId}`,
      type: 'POST',
      beforeSend: setAuthHeader,
      datatype: 'json',
      data: {vote: vote}
    })
  },
  postResource(title, body, aLink, tags, category) {
    return $.ajax({
      url: `${apiUrl}/resources/`,
      type: 'POST',
      beforeSend: setAuthHeader,
      datatype: 'json',
      data: {
        title: title,
        body: body,
        link: aLink,
        tags: tags,
        category: category
      }
    });
  },
  putResource(resourceId, body){
    return $.ajax({
      url: `${apiUrl}/resources/${resourceId}`,
      type: 'PUT',
      beforeSend: setAuthHeader,
      datatype: 'json',
      data: {
        body: body
      }
    });
  },
  deleteResource(resourceId){
    return $.ajax({
      url: `${apiUrl}/resources/${resourceId}`,
      type: 'DELETE',
      beforeSend: setAuthHeader
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
  },
  saveResource(userId, resourceId) {
    return $.ajax({
      url: `${apiUrl}/users/saveResource/${resourceId}`,
      type: 'POST',
      beforeSend: setAuthHeader,
      datatype: 'json'
    })
    .done( (resp) => {
      let me = store.getDatum('me');
      me.savedResources = new Set(resp);
      store.saveDatum('me', me);
    })
  },
  savedResources(userId) {
    return $.ajax({
      url: `${apiUrl}/users/savedResources/${userId}`,
      type: 'GET',
      beforeSend: setAuthHeader
    });
  }
};

//listeners
store.registerListener('token', API.getMyInfo);

export default API;
