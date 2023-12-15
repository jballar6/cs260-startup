import React from 'react';

export function Stats() {
    return (
        <main className="container-fluid text-center">
            <h1>UNDER CONSTRUCTION, NOT PART OF 260 SUBMISSION</h1>
            <h2 className="userstats"></h2>
            <h6>Logging since September 1st, 2023</h6>
            <form method="add">
                <input type="text" id="search" placeholder="Search for a workout" />
                <button type="submit" className="btn btn-danger btn-custom">Go</button>
            </form>
            <h5>Top bench press lifts:</h5>
            <div className="list-group list-group-custom">
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <span>Sort by:</span>
                    <span className="stats-sorter prevent-select">Weight</span>
                </div>
                <div className="inner-div" style={{ overflow: 'auto', height: 'calc(100% - 40px)' }}>
                    <li className="list-group-item list-group-item-custom">415 lbs. - 1 rep - September 12, 2023</li>
                    <li className="list-group-item list-group-item-custom">410 lbs. - 2 reps - September 9, 2023</li>
                    <li className="list-group-item list-group-item-custom">405 lbs. - 3 reps - September 15, 2023</li>
                    <li className="list-group-item list-group-item-custom">405 lbs. - 4 reps - September 6, 2023</li>
                </div>
            </div>
        </main>
    );
}