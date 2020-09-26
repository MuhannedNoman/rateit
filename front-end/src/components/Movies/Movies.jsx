import React, { useState } from 'react';
import { getMovies } from '../../services/fakeMovieService';
import { paginate } from '../../utils/Paginate';
import Pagination from '../Pagination';
import Like from './../Like';

const Movies = () => {
  const [allMovies, setAllMovies] = useState(getMovies());

  const [pageSize, setPageSize] = useState(4);

  const [currentPage, setCurrentPage] = useState(1);

  const movies = paginate(allMovies, currentPage, pageSize);

  const handleDelete = (movie) => {
    const { _id: id } = movie;
    setAllMovies(movies.filter((movie) => movie._id !== id));
  };

  const handleLike = (movie) => {
    const { _id: id } = movie;
    setAllMovies(
      movies.map((movie) => {
        if (movie._id === id) {
          movie.liked = !movie.liked;
        }
        return movie;
      })
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {allMovies.length === 0 ? (
        <p>There are no movies in the database</p>
      ) : (
        <>
          <p>{`Showing ${allMovies.length} movies in the database.`}</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
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
                    <Like
                      liked={movie.liked}
                      onClick={() => handleLike(movie)}
                    />
                  </td>
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
          <Pagination
            onPageChange={handlePageChange}
            items={allMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default Movies;
