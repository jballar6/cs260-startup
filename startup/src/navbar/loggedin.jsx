import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export function Loggedin() {
    return (
        <BrowserRouter>
            <nav className="navbar fixed-top navbar-dark d-flex justify-content-center">
                <menu className="d-flex">
                    <li className="nav-item-active"><NavLink className="nav-link" to="liftlog">Lift Log</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="calendar">Lift History</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="stats">Stats</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" onClick={logout}>Log out</NavLink></li>
                </menu>
            </nav>
            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/stats' element={<Stats />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}