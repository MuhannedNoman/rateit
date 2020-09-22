import React, { useState } from 'react';
import { getMovies } from '../../services/fakeMovieService';

const Movies = () => {
  const [movies, setMovies] = useState(getMovies());

  const handleDelete = (movie) => {
    const { _id: id } = movie;
    setMovies(movies.filter((movie) => movie._id !== id));
  };

  return (
    <div>
      {movies.length === 0 ? (
        <p>There are no movies in the database</p>
      ) : (
        <>
          <p>{`Showing ${movies.length} in the database.`}</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Movies;
