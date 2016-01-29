import {store} from './store';
import API from '../API'

export default function init() {

  let token = localStorage.getItem('token');
  let tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : false;

  if (!tokenPayload) return false;

  if (Date.now() > tokenPayload.exp * 1000) {
    localStorage.removeItem('token');
    return false;
  }

  store.saveDatum('token', token);
  API.getMyInfo();
  window.location.hash = '#/all'
  return true;

}
