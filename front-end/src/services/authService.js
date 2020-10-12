import http from './httpServices';
import { API_URL } from '../config.json';

const authEndPoint = `${API_URL}/auth`;

export function login(email, password) {
  return http.post(authEndPoint, { email, password });
}
