import http from './httpServices';
import { API_URL } from '../config.json';

const movieEndPoint = `${API_URL}/movies`;

export function getMovies() {
  return http.get(movieEndPoint);
}

export function getMovie(id) {
  return http.get(`${movieEndPoint}/${id}`);
}

export function saveMovie(movie) {
  return http.get(movieEndPoint);
}

export function deleteMovie(id) {
  return http.delete(`${movieEndPoint}/${id}`);
}
