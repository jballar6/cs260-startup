import React from 'react';
import Button from 'react-bootstrap/Button';

export function Liftlog({props}) {

    function logout() {
        fetch(`/api/auth/logout`, {
        method: 'delete',
        })
        .catch(() => {
            // Logout failed. Assuming offline
        })
        .finally(() => {
            localStorage.removeItem('userName');
            props.onLogout();
        });
    }

    // Function to change date when nav-back-day or nav-forward-day is clicked
    function changeDate() {
        const navBackDay = document.querySelector('.nav-back-day');
        const navForwardDay = document.querySelector('.nav-forward-day');
        const logDate = document.querySelector('.log-date');

        navBackDay.addEventListener('click', function () {
            // Subtract one day from currentDate
            currentDate.setDate(currentDate.getDate() - 1);

            // Check if currentDate matches the current date
            if (currentDate.toDateString() === new Date().toDateString()) {
            logDate.textContent = "Today";
            } else {
            // Update logDate and load workouts for the new date
            logDate.textContent = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }

            //loadWorkouts();
        });

        navForwardDay.addEventListener('click', function () {
            // Add one day to currentDate
            currentDate.setDate(currentDate.getDate() + 1);

            // Check if currentDate matches the current date
            if (currentDate.toDateString() === new Date().toDateString()) {
            logDate.textContent = "Today";
            } else {
            // Update logDate and load workouts for the new date
            logDate.textContent = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }

            //loadWorkouts();
        });
    }

    return (
        <main className="container-fluid text-center">
            <Button variant='danger' onClick={() => logout()}>
                Logout
            </Button>
            <h2 className="userlog"></h2>
            <h6 className="flash-notification"></h6>
            <form method="add" onSubmit={(event) => event.preventDefault()}>
                <input type="text" id="search" placeholder="Record a workout" />
                <button type="submit" className="btn btn-danger btn-custom" onClick={() => logWorkout()}>Go</button>
            </form>
            <div className="list-group list-group-custom">
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                    <span className="nav-back-day prevent-select" onClick={() => changeDate()}>&#10094;</span>
                    <div className="log-date">Today</div>
                    <span className="nav-forward-day prevent-select" onClick={() => changeDate()}>&#10095;</span>
                </div>
                <div id="workouts-list" className="inner-div" style={{ overflow: 'auto', height: 'calc(100% - 40px)'}}>
                </div>
            </div>
        </main>
    );
}