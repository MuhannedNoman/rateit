import _ from 'lodash';
import React, { useState } from 'react';
import { getGenres } from '../../services/fakeGenreService';
import { getMovies } from '../../services/fakeMovieService';
import { paginate } from '../../utils/Paginate';
import ListGroup from '../ListGroup/ListGroup';
import Pagination from '../Pagination';
import MoviesTable from './MoviesTable';

const Movies = () => {
  const [allMovies, setAllMovies] = useState(getMovies());

  const [genres] = useState([{ name: 'All Genre' }, ...getGenres()]);

  const [pageSize] = useState(4);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentGenre, setCurrentGenre] = useState('');

  const [sort, setSort] = useState({ path: 'title', order: 'asc' });

  const handleDelete = (movie) => {
    const { _id: id } = movie;
    setAllMovies((prevState) => prevState.filter((movie) => movie._id !== id));
  };

  const handleLike = (movie) => {
    const { _id: id } = movie;
    const newMovies = allMovies.map((movie) => {
      if (movie._id === id) {
        movie.liked = !movie.liked;
      }
      return movie;
    });
    setAllMovies(newMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setCurrentGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sort) => {
    setSort(sort);
  };

  const getPagedData = () => {
    const filtred =
      currentGenre && currentGenre._id
        ? allMovies.filter((m) => m.genre._id === currentGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtred, [sort.path], [sort.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtred.length,
      data: movies,
    };
  };

  const { totalCount, data } = getPagedData();

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
        <p>{`Showing ${totalCount} movies in the database.`}</p>
        <MoviesTable
          onDelete={handleDelete}
          onLike={handleLike}
          movies={data}
          onSort={handleSort}
          sort={sort}
        />
        <Pagination
          onPageChange={handlePageChange}
          items={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Movies;
