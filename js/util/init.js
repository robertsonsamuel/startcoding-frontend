import {store} from './store';

export default function init() {

  let token = localStorage.getItem('token');
  let tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : false;

  if (!tokenPayload) return false;

  if (Date.now() > tokenPayload.exp * 1000) {
    localStorage.removeItem('token');
    return false;
  }

  window.location.hash = '#/all'
  store.saveDatum('token', token);
  return true;

}
