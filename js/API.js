// let apiUrl = 'https://vast-sierra-7757.herokuapp.com';
let apiUrl = 'http://localhost:3000';

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
  getComments(topicId) {
    return $.get(`${apiUrl}/comments/${topicId}`)
  },
  postComment(parentId, body, seed) {
    let query = seed ? '?seed=true' : '';
    let token = localStorage.getItem('token');
    return $.ajax({
      url: `${apiUrl}/comments/${parentId + query}`,
      type: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      },
      datatype: 'json',
      data: {body: body}
    });
  }
};

export default API;
