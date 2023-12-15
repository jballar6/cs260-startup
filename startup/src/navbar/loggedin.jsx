import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export function Loggedin() {
    return (
        <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark d-flex justify-content-center" style={{backgroundColor: 'rgba(33,37,41,1)'}}>
            <menu className="d-flex">
            <li className="nav-item-active"><a className="nav-link" href="loggedin.html">Lift Log</a></li>
            <li className="nav-item"><a className="nav-link" href="calendar.html">Lift History</a></li>
            <li className="nav-item"><a className="nav-link" href="stats.html">Stats</a></li>
            <li className="nav-item"><a className="nav-link" onClick={null}>Log out</a></li>
            </menu>
        </nav>

        </header>
    );
}