import React from 'react';

const Input = ({ name, label, value, type, onChange }) => {
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
    </div>
  );
};

export default Input;
