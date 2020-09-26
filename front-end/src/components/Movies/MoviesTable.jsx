import React from 'react';
import Table from '../Table';
import Like from './../Like';

const MoviesTable = ({ movies, sort, onLike, onDelete, onSort }) => {
  const columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
    {
      key: 'delete',
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  return <Table data={movies} columns={columns} sort={sort} onSort={onSort} />;
};

export default MoviesTable;
