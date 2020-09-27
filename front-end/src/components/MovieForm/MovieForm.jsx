import React from 'react';

const MovieForm = ({ match, history }) => {
  const handleSubmit = () => {
    history.push('/movies');
  };
  return (
    <div>
      MovieForm - {match.params.id}
      <button className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;
