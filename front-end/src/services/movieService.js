import http from './httpServices';

const movieEndPoint = 'http://localhost:3001/api/movies';

export function getMovies() {
  return http.get(movieEndPoint);
}

export function deleteMovie(id) {
  return http.delete(`${movieEndPoint}/${id}`);
}
