import http from './httpServices';
import { API_URL } from '../config.json';

const movieEndPoint = `${API_URL}/movies`;

const movieUrl = (id) => {
  return `${movieEndPoint}/${id}`;
};

export function getMovies() {
  return http.get(movieEndPoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(movieEndPoint, movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
