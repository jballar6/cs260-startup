import React from 'react';

import Button from 'react-bootstrap/Button';
import {MessageDialog} from './messageDialog';

export function Login({ onLogin }) {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({email: userName, password: password}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            onLogin(userName); // Call the onLogin function passed in as a prop
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }

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

    return (
    <>
    <header className='container-fluid'>
        <nav className="navbar fixed-top navbar-dark d-flex flex-column align-items-center justify-content center">
            <h5>Welcome to</h5>
            <h1>The Lift Log</h1>
        </nav>
    </header>
    <main className='container-fluid text-center'>
        <h6 id="quote" style={{ marginTop: '5vh' }}></h6>
        <div>
            <form>
            <div className='input-group mb-3'>
            <span className='input-group-text'>@</span>
            <input
                className='form-control'
                type='text'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='your@email.com'
            />
            </div>
            </form>
            <form>
            <div className='input-group mb-3'>
            <span className='input-group-text'>🔒</span>
            <input
                className='form-control'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
            />
            </div>
            </form>
            <Button variant='danger' onClick={() => loginUser()}>
            Login
            </Button>
            <Button variant='danger' onClick={() => createUser()}>
            Create
            </Button>
        </div>
        <img src="assets/BlackRedBodybuilder.png" width="270" />

        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </main>
    </>
    );
}