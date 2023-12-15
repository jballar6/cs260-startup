import React, { useEffect } from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
    function displayQuote(data) {
        fetch('https://api.quotable.io/quotes?author=bruce-lee')
            .then((response) => response.json())
            .then((data) => {
                const containerEl = document.querySelector('#quote');

                const quoteEl = document.createElement('p');
                quoteEl.classList.add('quote');
                const authorEl = document.createElement('p');
                authorEl.classList.add('author');

                // Get a random index from 0 to data.count - 1
                const randomIndex = Math.floor(Math.random() * data.count);
                // Get the quote object at that index
                const quote = data.results[randomIndex];

                quoteEl.textContent = quote.content;
                authorEl.textContent = quote.author;

                containerEl.appendChild(quoteEl);
                containerEl.appendChild(authorEl);
            });
    }

    useEffect(() => {
        displayQuote();
    }, []);

    return (
        <>
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark d-flex flex-column align-items-center justify-content center">
                <h5>Welcome to</h5>
                <h1>The Lift Log</h1>
            </nav>
        </header>
        <main className='container-fluid text-center'>
            <h6 id="quote" style={{ marginTop: '5vh' }}></h6>
            <img src="assets/BlackRedBodybuilder.png" width="270" />
        </main>
        <footer className="bg-secondary text-white-50">
            <div className="container-fluid">
                <span className="text-reset">
                    Author Name: Jon B
                    <a className="text-reset" href="https://github.com/jballar5/cs260-startup">GitHub</a>
                </span>
            </div>
        </footer>
        </>
    );
}
