import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    const logout = () => {
      localStorage.removeItem('token');
      window.location = '/';
    };
    logout();
  }, []);
  return null;
};

export default Logout;
