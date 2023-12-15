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
        <main className='container-fluid text-center'>
            <div>
                {authState !== AuthState.Unknown && (
                    <div>
                        <h5>Welcome to</h5>
                        <h1>The Lift Log</h1>
                    </div>
                )}
                {authState === AuthState.Authenticated && (
                    <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        userName={userName}
                        onLogin={(loginUserName) => {
                            onAuthChange(loginUserName, AuthState.Authenticated);
                        }}
                    />
                )}
            </div>
            <h6 id="quote" style={{ marginTop: '5vh' }}></h6>
            <img src="assets/BlackRedBodybuilder.png" width="270" />
        </main>
    );
}
