import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export function Liftlog() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        loadWorkouts();
        configureWebSocket();
    }, []);

    function configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socket.onopen = (event) => {
            console.log("WebSocket connected");
        };
        socket.onclose = (event) => {
            console.log("WebSocket disconnected");
        };
        socket.onmessage = async (event) => {
            console.log('this was run (onmessage)');
            console.log(event.data);
            const msg = await JSON.parse(event.data);
            if (msg.type === 'Success') {
                displayFlashNotification('Workout logged successfully!');
            } else if (msg.type === 'Failure') {
                displayFlashNotification('Failed to save workout. Try again');
            }
        };
    }

    async function loadWorkouts() {
        try {
            const response = await fetch('/api/workouts');
            const workouts = await response.json();
            setWorkouts(workouts.reverse());
            localStorage.setItem('workouts', JSON.stringify(workouts));
        } catch {
            const workoutsText = localStorage.getItem('workouts');
            if (workoutsText) {
                const workouts = JSON.parse(workoutsText);
                setWorkouts(workouts.reverse());
            }
        }
    }

    function displayFlashNotification(message) {
        const flashNotification = document.querySelector('h6.flash-notification');
        flashNotification.textContent = message;
        flashNotification.style.display = 'block';
        setTimeout(() => {
            flashNotification.style.display = 'none';
        }, 4000);
    }

    async function logWorkout() {
        const workout = document.getElementById('search').value;
        const workoutObj = { workout: workout };
        document.getElementById('search').value = '';

        try {
            const response = await fetch('/api/workouts', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(workoutObj),
            });

            const workouts = await response.json();
            localStorage.setItem('workouts', JSON.stringify(workouts));
            broadcastEvent('{USERNAME}', 'Success', workoutObj);
        } catch {
            this.logWorkoutLocal(workout);
            broadcastEvent('{USERNAME}', 'Failure', workoutObj);
        }

        loadWorkouts();
    }

    function logWorkoutLocal(workout) {
        const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        workouts.push(workout);
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('workouts', JSON.stringify(workouts));
        setWorkouts(workouts.reverse());
    }

    function changeDate() {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    }

    return (
        <main className="container-fluid text-center">
            <h2 className="userlog"></h2>
            <h6 className="flash-notification"></h6>
            <form method="add" onSubmit={(event) => event.preventDefault()}>
                <input type="text" id="search" placeholder="Record a workout" />
                <button type="submit" className="btn btn-danger btn-custom" onClick={() => logWorkout()}>
                    Go
                </button>
            </form>
            <div className="list-group list-group-custom">
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <span className="nav-back-day prevent-select" onClick={changeDate}>
                        &#10094;
                    </span>
                    <div className="log-date">{currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <span className="nav-forward-day prevent-select" onClick={() => setCurrentDate(new Date())}>
                        &#10095;
                    </span>
                </div>
                <div id="workouts-list" className="inner-div" style={{ overflow: 'auto', height: 'calc(100% - 40px)' }}>
                    {workouts.length > 0 ? (
                        workouts.map((workout, index) => (
                            <li key={index} className="list-group-item list-group-item-custom">
                                {workout.workout}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item list-group-item-custom">No workouts logged.</li>
                    )}
                </div>
            </div>
        </main>
    );
}