import Joi from 'joi-browser';
import React, { useState } from 'react';
import Input from '../Input';

const Login = () => {
  const [loginData, setLoginData] = useState({
    account: {
      userName: '',
      password: '',
    },
    errors: {
      userName: '',
      password: '',
    },
  });

  const Schema = {
    userName: Joi.string().required().label('User Name'),
    password: Joi.string().required().label('Password'),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(loginData.account, Schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: Schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ target }) => {
    const error = validateProperty(target);

    const { name, value } = target;

    setLoginData((prevState) => ({
      ...prevState,
      account: {
        ...prevState.account,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: error,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setLoginData((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));
    if (errors) return;
  };

  const { account, errors } = loginData;

  return (
    <div>
      <h1>Login</h1>
      <form id="login" onSubmit={handleSubmit}>
        <Input
          name="userName"
          value={account.userName}
          label="User Name"
          onChange={handleChange}
          type="text"
          error={errors.userName}
        />
        <Input
          name="password"
          value={account.password}
          label="Password"
          onChange={handleChange}
          type="password"
          error={errors.password}
        />
        <button disabled={validate()} type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
