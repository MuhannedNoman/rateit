import http from './httpServices';
import { API_URL } from '../config.json';

export function getGenres() {
  return http.get(`${API_URL}/genres`);
}
