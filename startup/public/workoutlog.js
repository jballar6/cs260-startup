//Model data structure
//const userlogs = {
    //user1 : "logs"->{
        //date : [{workout : a, sets : b, weight : c, reps : d}],
        //date2 : {workout : a, sets : b, weight : c, reps : d}
    //},
    //user2 : "logs"->{
        //date : {workout : a, sets : b, weight : c, reps : d},
        //date2 : {workout : a, sets : b, weight : c, reps : d}
    //}
//}

async function loadWorkouts() {
  let workouts = [];
  try {
    // Get the latest workouts from the service
    const response = await fetch('/api/userlogs');
    const userlogs = await response.json();

    // Get the workouts for the current date
    const today = new Date().toISOString().split('T')[0];
    if (userlogs[today]) {
      workouts = userlogs[username][today];
    }

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

  displayWorkouts(workouts.reverse());
}

function displayWorkouts(workouts) {
  const innerDiv = document.querySelector('.inner-div');

  if (workouts.length > 0) {
    // Update the DOM with the workouts
    for (const [i, workout] of workouts.entries()) {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item list-group-item-custom';
      for (const key in workout) {
        listItem.textContent += `${workout[key]} - `
      }
      innerDiv.appendChild(listItem);
    }
  } else {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item list-group-item-custom';
    listItem.textContent = 'No workouts logged.';

    // add the list item to the inner div
    innerDiv.appendChild(listItem);
  }
}

// Global variable to store the current date
var currentDate = new Date();

// Function to log a workout
async function logWorkout() {
    const userName = localStorage.getItem('userName');  
    const today = new Date().toISOString().split('T')[0];
    // Get the workout from the input field
    const workout = document.getElementById('search').value.split('-');
    const workoutName = workout[0];
    const weightNum = workout[1];
    const setCount = workout[2];
    const repCount = workout[3];
    const newWorkout = {workout: workoutName, weight: weightNum, sets : setCount, reps: repCount};

    console.log(newWorkout)

    // Check if workout is not empty
    if (workout) {
        try {
        const response = await fetch('/api/userlogs', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newWorkout),
        });

        // Store what the service gave us as the user's logs
        const userlogs = await response.json();
        localStorage.setItem('userlogs', JSON.stringify(userlogs));
        } catch {
        // If there was an error then just track scores locally
        console.log("Sumthing wrong")
        }
        //// Get the latest workouts from the service
        //const response = await fetch('/api/userlogs');
        //const userlogs = await response.json();

        ////Get the workouts dictionary

        //// Add the new workout to the array
        //workouts.push(workout);

        //// Get today's date as a string in the format 'YYYY-MM-DD'
        //const today = new Date().toISOString().split('T')[0];

        //// Save the updated workouts array to localStorage
        //localStorage.setItem('workouts', JSON.stringify(workouts));

        //// Create a new list item
        //const listItem = document.createElement('li');
        //listItem.className = 'list-group-item list-group-item-custom';
        //listItem.textContent = workout;

        //// Add the list item to the inner div
        //const innerDiv = document.querySelector('.inner-div');
        
        //// Check if "No workouts logged." exists and remove it
        //const noWorkoutItem = innerDiv.querySelector('.list-group-item');
        //if (noWorkoutItem && noWorkoutItem.textContent === 'No workouts logged.') {
            //innerDiv.removeChild(noWorkoutItem);
        //}

        //// Add the workout to the userlogs object
        //const username = 'user1'; // replace this with the actual username
        //if (!userlogs[username]) {
            //userlogs[username] = {};
        //}
        //if (!userlogs[username][today]) {
            //userlogs[username][today] = [];
        //}

        //userlogs[username][today].push({
            //workout: workout,
            //sets: 0, // replace with actual sets
            //weight: 0, // replace with actual weight
            //reps: 0 // replace with actual reps
        //});
    }
    loadWorkouts()
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
};
