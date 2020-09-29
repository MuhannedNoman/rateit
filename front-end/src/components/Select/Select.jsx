import React from 'react';

const Select = ({ name, label, value, options, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="custom-select form-control"
      >
        <option defaultValue hidden></option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  );
};

export default Select;
