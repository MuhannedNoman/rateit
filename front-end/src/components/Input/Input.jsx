import React from 'react';

const Input = ({ name, label, value, type, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        type={type}
        className="form-control"
        onChange={onChange}
        name={name}
        id={name}
        aria-describedby="email"
        value={value}
      />
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  );
};

export default Input;
