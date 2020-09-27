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

  const validate = () => {
    const errors = {};

    if (loginData.account.userName.trim() === '')
      errors.userName = 'User name is required.';
    else errors.userName = '';

    if (loginData.account.password.trim() === '')
      errors.password = 'Password is required.';
    else errors.password = '';

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setLoginData((prevState) => ({
      ...prevState,
      account: {
        ...prevState.account,
        [name]: value,
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
