let apiUrl = 'https://vast-sierra-7757.herokuapp.com';

let API = {
  register(newUserInfo) {
    return $.post(`${apiUrl}/users/register`, newUserInfo);
  },
  login(userInfo) {
    return $.post(`${apiUrl}/users/login`, userInfo);
  }
};

export default API;
