// Global variable to store the current date
var currentDate = new Date();

// Function to log a workout
function logWorkout() {
    // Get the workout from the input field
    var workout = document.getElementById('search').value;

    // Check if workout is not empty
    if (workout) {
        // Get the existing workouts from localStorage
        var workouts = JSON.parse(localStorage.getItem('workouts')) || [];

        // Add the new workout to the array
        workouts.push(workout);

        // Get today's date as a string in the format 'YYYY-MM-DD'
        var today = new Date().toISOString().split('T')[0];

        //Create logbook object

        //if (today in logbook):

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
}

// Function to load workouts from localStorage
function loadWorkouts() {
    // Get the workouts from localStorage
    var workouts = JSON.parse(localStorage.getItem('workouts')) || [];

    // Reverse the order of workouts
    workouts = workouts.reverse();

    // Get the inner div
    var innerDiv = document.querySelector('.inner-div');

    // Check if workouts is not null
    if (workouts.length > 0) {
        for (var i = 0; i < workouts.length; i++) {
            // Create a new list item for each workout
            var listItem = document.createElement('li');
            listItem.className = 'list-group-item list-group-item-custom';
            listItem.textContent = workouts[i];

            // Add the list item to the inner div
            innerDiv.appendChild(listItem);
        }
    } else {
        // Create a new list item with "No workouts logged."
        var listItem = document.createElement('li');
        listItem.className = 'list-group-item list-group-item-custom';
        listItem.textContent = 'No workouts logged.';

        // Add the list item to the inner div
        innerDiv.appendChild(listItem);
    }
}

// Load workouts when the page loads
window.onload = loadWorkouts;