import React, { useEffect, useState } from 'react';
import Movie from './components/movies';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound.jsx';
import NavBar from './components/common/navBar';
import MovieForm from './components/movieForm';
import Logout from './components/logout';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import ProtectedRoute from './components/common/protectedRoute';
import { getCurrentUser } from './services/authService';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} />
      <main className='container'>
        <Routes>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
          <Route path='/register' element={<RegisterForm />}></Route>
          <Route
            path='/movies/:id'
            element={
              <ProtectedRoute>
                <MovieForm />
              </ProtectedRoute>
            }
          />
          <Route
            path='/movies/new'
            element={
              <ProtectedRoute>
                <MovieForm />
              </ProtectedRoute>
            }
          ></Route>
          <Route path='/movies' element={<Movie user={user} />}></Route>
          <Route path='customers' element={<Customers />}></Route>
          <Route path='rentals' element={<Rentals />}></Route>
          <Route path='/' element={<Navigate replace to='/movies' />}></Route>
          <Route path='not-found' element={<NotFound />}></Route>
          <Route
            path='*'
            element={<Navigate replace to='/not-found' />}
          ></Route>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
