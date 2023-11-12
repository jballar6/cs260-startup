// Function to sort workouts
function sortWorkouts(sortBy) {
    // Get the inner div
    var innerDiv = document.querySelector('.inner-div');

    // Get all list items in the inner div
    var listItems = Array.from(innerDiv.querySelectorAll('.list-group-item'));

    // Sort the list items based on the sortBy parameter
    listItems.sort(function(a, b) {
        // Split the workout strings into [weight, reps, date]
        var workoutA = a.textContent.split(' - ');
        var workoutB = b.textContent.split(' - ');

        if (sortBy === 'Weight') {
            return parseInt(workoutB[0]) - parseInt(workoutA[0]);
        } else if (sortBy === 'Reps') {
            return parseInt(workoutB[1]) - parseInt(workoutA[1]);
        } else {  // sortBy === 'Date'
            // Split the date strings into [month, day, year]
            var dateA = workoutA[2].split(' ');
            var dateB = workoutB[2].split(' ');

            // Remove the comma from the day and convert to integer
            var dayA = parseInt(dateA[1].replace(',', ''));
            var dayB = parseInt(dateB[1].replace(',', ''));

            return dayB - dayA;
        }
    });

    // Clear the inner div
    innerDiv.innerHTML = '';

    // Add the sorted list items back to the inner div
    for (var i = 0; i < listItems.length; i++) {
        innerDiv.appendChild(listItems[i]);
    }
}

// Function to change sort order when stats-sorter is clicked
function changeSortOrder() {
    var statsSorter = document.querySelector('.stats-sorter');
    statsSorter.addEventListener('click', function() {
        var currentSort = statsSorter.textContent.trim();
        if (currentSort === 'Weight') {
            statsSorter.textContent = 'Reps';
            sortWorkouts('Reps');
        } else if (currentSort === 'Reps') {
            statsSorter.textContent = 'Date';
            sortWorkouts('Date');
        } else {  // currentSort === 'Date'
            statsSorter.textContent = 'Weight';
            sortWorkouts('Weight');
        }
    });
}

// Sort workouts and set up sort order change when the page loads
window.onload = function() {
    sortWorkouts('Weight');  // Change this to 'Reps' or 'Date' to sort by reps or date
    changeSortOrder();
};