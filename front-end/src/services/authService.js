import http from './httpServices';
import jwtDecode from 'jwt-decode';
import { API_URL } from '../config.json';

const authEndPoint = `${API_URL}/auth`;
const TOKEN_KEY = 'token';

export async function login(email, password) {
  const { data: jwt } = await http.post(authEndPoint, { email, password });
  localStorage.setItem(TOKEN_KEY, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(TOKEN_KEY, jwt);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(TOKEN_KEY);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}