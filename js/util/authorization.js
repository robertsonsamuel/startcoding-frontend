export function canHazToken() {
  let token = localStorage.getItem('token');
  if (!token) {
    alert("Login you sneaky fool!");
    return false;
  }
  let payload = JSON.parse(atob(token.split('.')[1]));
  return payload
}
