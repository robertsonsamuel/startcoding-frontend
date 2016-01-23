let loginMSg = 'Login or register, you sneaky fool!';

export function parseToken(token) {
  if (!token) return '';
  let payload = JSON.parse(atob(token.split('.')[1]));
  return payload;
}

export function canHazToken() {
  let token = localStorage.getItem('token');
  let payload = parseToken(token);
  return payload;
}

export function isAuthorized(userId) {
  let payload = canHazToken();
  if (payload.id !== userId) return false;
  return payload
}
