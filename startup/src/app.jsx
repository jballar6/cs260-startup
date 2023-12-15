import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Liftlog } from './liftlog/liftlog';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const isAuthenticated = Boolean(userName);

    const logout = () => {
        setUserName('');
        localStorage.removeItem('userName');
    };

    const login = (username) => {
        setUserName(username);
        localStorage.setItem('userName', username);
    };

    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <Routes>
                    <Route path="/liftlog" element={isAuthenticated ? <Liftlog onLogout={logout} /> : <Login onLogin={login} />} />
                    <Route path="/" element={<Login onLogin={login} />} />
                </Routes>
            </div>
            <footer className="bg-secondary text-white-50">
                <div className="container-fluid">
                    <span className="text-reset">
                        Author Name: Jon B
                        <a className="text-reset" href="https://github.com/jballar5/cs260-startup">GitHub</a>
                    </span>
                </div>
            </footer>
        </BrowserRouter>
    
    );
}

export default App;