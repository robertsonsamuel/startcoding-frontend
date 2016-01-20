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
  }

};

export default API;
