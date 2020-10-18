import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Customers from './components/Customers';
import Login from './components/Login';
import MovieForm from './components/MovieForm';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Rentals from './components/Rentals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  useEffect(() => {
    const getCurrentUser = () => {
      try {
        const jwt = localStorage.getItem('token');
        const user = jwtDecode(jwt);
        setCurrentUser(user);
      } catch (ex) {}
    };
    getCurrentUser();
  }, []);

  const [currentUser, setCurrentUser] = useState();

  return (
    <Router>
      <ToastContainer />
      <Navbar user={currentUser} />
      <main className="container">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
