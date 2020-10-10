import http from './httpServices';
import { API_URL } from '../config.json';

const userEndPoint = `${API_URL}/users`;

export function register(user) {
  return http.post(userEndPoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
