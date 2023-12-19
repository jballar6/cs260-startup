import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Liftlog } from './liftlog/liftlog';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        {authState === AuthState.Authenticated && (
            <Liftlog userName={userName} onLogout={() => {setAuthState(AuthState.Unauthenticated); setUserName('');}} />
        )}
        {authState === AuthState.Unauthenticated && (
            <Login
                userName={userName}
                onLogin={(userName) => {
                    setUserName(userName);
                    setAuthState(AuthState.Authenticated);
                }}
            />
        )}

        <footer className="bg-secondary text-white-50">
            <div className="container-fluid">
                <span className="text-reset">
                    Author Name: Jon B
                    <a className="text-reset" href="https://github.com/jballar5/cs260-startup">GitHub</a>
                </span>
            </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
