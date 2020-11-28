import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';
import Table from '../Table';
import Like from './../Like';

const MoviesTable = ({ movies, sort, onLike, onDelete, onSort }) => {
  const columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
  ];

  const deleteColumn =  {
    key: 'delete',
    content: (movie) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(movie)}
      >
        Delete
      </button>
    ),
  }

  const user = getCurrentUser();
  if (user && user.isAdmin) {
    columns.push(deleteColumn)
  }

  return <Table data={movies} columns={columns} sort={sort} onSort={onSort} />;
};

export default MoviesTable;
