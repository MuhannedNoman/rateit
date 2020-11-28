import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../../services/genreService';
import { getMovies, deleteMovie } from '../../services/movieService';
import { paginate } from '../../utils/Paginate';
import ListGroup from '../ListGroup/ListGroup';
import Pagination from '../Pagination';
import MoviesTable from './MoviesTable';
import {toast} from 'react-toastify'

const Movies = ({ user }) => {
  useEffect(() => {
    const fetchGenre = async () => {
      const { data } = await getGenres();
      setGenres([{ name: 'All Genre' }, ...data]);
    };
    fetchGenre();

    const fetchMovies = async () => {
      const { data } = await getMovies();
      setAllMovies([...data]);
    };
    fetchMovies();
  }, []);

  const [allMovies, setAllMovies] = useState([]);

  const [genres, setGenres] = useState([]);

  const [pageSize] = useState(4);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentGenre, setCurrentGenre] = useState('');

  const [sort, setSort] = useState({ path: 'title', order: 'asc' });

  const [search, setSearch] = useState('');

  const handleDelete = async (movie) => {
    const originalMovies = allMovies;
    const { _id: id } = movie;
    try {
      await deleteMovie(id);
      setAllMovies((prevState) =>
        prevState.filter((movie) => movie._id !== id)
      );
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error('This movie has already been deleted');

      setAllMovies(originalMovies);
    }
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
    setSearch('');
    setCurrentGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sort) => {
    if (currentGenre) setSort(sort);
  };

  const handleSearch = ({ target }) => {
    setCurrentGenre('');
    setSearch(target.value);
  };

  const getPagedData = () => {
    let filterd = allMovies;

    if (search !== '')
      filterd = allMovies.filter((m) =>
        m.title.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
      );
    else if (currentGenre && currentGenre._id)
      filterd = allMovies.filter((m) => m.genre._id === currentGenre._id);

    const sorted = _.orderBy(filterd, [sort.path], [sort.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filterd.length,
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
        {user && (
          <Link to="/movies/new">
            <button className="btn btn-primary mb-2">New Movie</button>
          </Link>
        )}
        <p>{`Showing ${totalCount} movies in the database.`}</p>
        <input
          name="searchMovies"
          type="search"
          onChange={handleSearch}
          value={search}
          className="form-control mb-4"
          id="searchMovies"
          placeholder="Search..."
        />
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
