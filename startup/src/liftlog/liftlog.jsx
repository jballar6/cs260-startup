import React from 'react';

export function Liftlog() {
    return (
        <main className="container-fluid text-center">
            <h2 className="userlog"></h2>
            <h6 className="flash-notification"></h6>
            <form method="add" onSubmit={(event) => event.preventDefault()}>
                <input type="text" id="search" placeholder="Record a workout" />
                <button type="submit" className="btn btn-danger btn-custom" onClick={() => logWorkout()}>Go</button>
            </form>
            <div className="list-group list-group-custom">
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                    <span className="nav-back-day prevent-select">&#10094;</span>
                    <div className="log-date">Today</div>
                    <span className="nav-forward-day prevent-select">&#10095;</span>
                </div>
                <div id="workouts-list" className="inner-div" style={{ overflow: 'auto', height: 'calc(100% - 40px)'}}>
                </div>
            </div>
        </main>
    );
}