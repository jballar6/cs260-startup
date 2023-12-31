// Event messages
const Success = 'Success';
const Failure = 'Failure'

// Functionality for user notifications using WebSocket

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
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
        if (msg.type === Success) {
            displayFlashNotification('Workout logged successfully!');
        } else if (msg.type === Failure) {
            displayFlashNotification('Failed to save workout. Try again');
        }
    };
}

function broadcastEvent(from, type, value) {
    const event = {
        from: from,
        type: type,
        value: value,
    };
    console.log(event);
    socket.send(JSON.stringify(event));
}

function displayFlashNotification(message) {
    const flashNotification = document.querySelector('h6.flash-notification');
    flashNotification.textContent = message;
    flashNotification.style.display = 'block';
    setTimeout(() => {
        flashNotification.style.display = 'none';
    }, 4000);
}

// Global variable to store the current date
let currentDate = new Date();

async function loadWorkouts() {
    let workouts = [];
    try {
        // Get the latest workouts from the service
        const response = await fetch('/api/workouts');
        workouts = await response.json();

        // Save the workouts in case we go offline in the future
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }
    catch {
        // If there was an error then just use the last saved workouts
        const workoutsText = localStorage.getItem('workouts');
        if (workoutsText) {
            workouts = JSON.parse(workoutsText);
        }
    }

    // Get the .inner-div element
    const workoutsLog = document.querySelector('.inner-div');

    // Remove existing list elements
    while (workoutsLog.firstChild) {
        workoutsLog.removeChild(workoutsLog.firstChild);
    }

    console.log("load workouts was called")
    displayWorkouts(workouts.reverse());
}

function displayWorkouts(workouts) {
  const workoutsLog = document.querySelector('.inner-div');

  if (workouts.length > 0) {
    // Update the DOM with the workouts
    for (const workout of workouts) {
        console.log("the main loop is running in display workouts")
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item list-group-item-custom';
        listItem.textContent = workout.workout;

        // add the list item to the inner div
        workoutsLog.appendChild(listItem);
    }
  }
    else {
        console.log("the else was called in display workouts")
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item list-group-item-custom';
        listItem.textContent = 'No workouts logged.';

        // add the list item to the inner div
        workoutsLog.appendChild(listItem);
    }
}

// Function to log a workout
async function logWorkout() {
    // Get the workout from the input field
    const workout = document.getElementById('search').value;

    // Convert to an object so that JSON.stringify will work
    const workoutObj = { workout: workout };

    // Clear the text field
    document.getElementById('search').value = '';

    try {
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(workoutObj),
        });

        const workouts = await response.json();
        localStorage.setItem('workouts', JSON.stringify(workouts));
        broadcastEvent('{USERNAME}', 'Success', workoutObj);
    }
    catch {
        //// If there was an error then just track scores locally
        this.logWorkoutLocal(workout);
        broadcastEvent('{USERNAME}', 'Failure', workoutObj);
    }

    loadWorkouts();
}

function logWorkoutLocal(workout) {
    // Get the existing workouts from localStorage
    var workouts = JSON.parse(localStorage.getItem('workouts')) || [];

    // Add the new workout to the array
    workouts.push(workout);

    // Get today's date as a string in the format 'YYYY-MM-DD'
    var today = new Date().toISOString().split('T')[0];

    // Save the updated workouts array to localStorage
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Create a new list item
    var listItem = document.createElement('li');
    listItem.className = 'list-group-item list-group-item-custom';
    listItem.textContent = workout;
    // Add the list item to the inner div
    var innerDiv = document.querySelector('.inner-div');
    
    // Check if "No workouts logged." exists and remove it
    var noWorkoutItem = innerDiv.querySelector('.list-group-item');
    if (noWorkoutItem && noWorkoutItem.textContent === 'No workouts logged.') {
        innerDiv.removeChild(noWorkoutItem);
    }
}

// Function to change date when nav-back-day or nav-forward-day is clicked
function changeDate() {
    const navBackDay = document.querySelector('.nav-back-day');
    const navForwardDay = document.querySelector('.nav-forward-day');
    const logDate = document.querySelector('.log-date');

    navBackDay.addEventListener('click', function() {
        // Subtract one day from currentDate
        currentDate.setDate(currentDate.getDate() - 1);

        // Check if currentDate matches the current date
        if (currentDate.toDateString() === new Date().toDateString()) {
            logDate.textContent = "Today";
        } else {
            // Update logDate and load workouts for the new date
            logDate.textContent = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'});
        }
        
        //loadWorkouts();
    });

    navForwardDay.addEventListener('click', function() {
        // Add one day to currentDate
        currentDate.setDate(currentDate.getDate() + 1);

        // Check if currentDate matches the current date
        if (currentDate.toDateString() === new Date().toDateString()) {
            logDate.textContent = "Today";
        } else {
            // Update logDate and load workouts for the new date
            logDate.textContent = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'});
        }
        
        //loadWorkouts();
    });
}

// Load workouts and set up date change when the page loads
window.onload = function() {
    // Update the log-date div to display the current date
    const logDate = document.querySelector('.log-date');
    logDate.textContent = "Today";

    loadWorkouts();
    changeDate();
    configureWebSocket();

    //displayFlashNotification('this works rihgt?')
};
