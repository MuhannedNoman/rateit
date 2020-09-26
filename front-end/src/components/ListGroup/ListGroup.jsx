import React from 'react';

const ListGroup = ({
  selectedGenre,
  genres,
  onGenreSelect,
  textProperty,
  value,
}) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          role="button"
          onClick={() => onGenreSelect(genre)}
          key={genre[value] || 0}
          className={
            selectedGenre === genre[textProperty]
              ? 'list-group-item active'
              : 'list-group-item'
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  value: '_id',
};

export default ListGroup;
