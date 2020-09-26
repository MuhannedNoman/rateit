import React, { useState } from 'react';
import { getGenres } from '../../services/fakeGenreService';
import { getMovies } from '../../services/fakeMovieService';
import { paginate } from '../../utils/Paginate';
import ListGroup from '../ListGroup/ListGroup';
import Pagination from '../Pagination';
import Like from './../Like';

const Movies = () => {
  const [allMovies, setAllMovies] = useState(getMovies());

  const [genres, setGenres] = useState([{ name: 'All Genre' }, ...getGenres()]);

  const [pageSize, setPageSize] = useState(4);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentGenre, setCurrentGenre] = useState('');

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

  const handleGenreSelect = (genre) => {
    setCurrentGenre(genre);
    setCurrentPage(1);
  };

  const filtred =
    currentGenre && currentGenre._id
      ? allMovies.filter((m) => m.genre._id === currentGenre._id)
      : allMovies;

  const movies = paginate(filtred, currentPage, pageSize);

  if (allMovies.length === 0) return <p>There are no movies in the database</p>;

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          selectedGenre={currentGenre.name}
          onGenreSelect={handleGenreSelect}
          genres={genres}
        />
      </div>
      <div className="col">
        <p>{`Showing ${filtred.length} movies in the database.`}</p>
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
                  <Like liked={movie.liked} onClick={() => handleLike(movie)} />
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
          items={filtred.length}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Movies;
