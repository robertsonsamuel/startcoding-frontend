let loginMSg = 'Login or register, you sneaky fool!'
import {pleaseLogin} from './alerts';

export function canHazToken() {
  let token = localStorage.getItem('token');
  if (!token) {
    pleaseLogin();
    return false;
  }
  let payload = JSON.parse(atob(token.split('.')[1]));
  return payload
}

export function isAuthorized(userId) {
  let payload = canHazToken();
  if (payload.id !== userId) {
    return false;
  }
  return payload
}
