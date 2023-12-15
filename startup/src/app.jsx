import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Liftlog } from './liftlog/liftlog';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [loggedin, setLoggedin] = React.useState(1);

  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        {loggedin === 1 && (
            <Liftlog />
        )}
        {loggedin === 0 && (
            <Login />
        )}

      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
