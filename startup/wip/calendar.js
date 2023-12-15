// Global variable to store the current date
var currentDate = new Date();

// Function to update the display month
function updateDisplayMonth() {
    var displayMonth = document.querySelector('.display-month');
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    displayMonth.textContent = monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();
}

// Function to change month when nav-back-day or nav-forward-day is clicked
function changeMonth() {
    var navBackDay = document.querySelector('.nav-back-day');
    var navForwardDay = document.querySelector('.nav-forward-day');

    navBackDay.addEventListener('click', function() {
        // Subtract one month from currentDate
        currentDate.setMonth(currentDate.getMonth() - 1);

        // Update display month
        updateDisplayMonth();
    });

    navForwardDay.addEventListener('click', function() {
        // Add one month to currentDate
        currentDate.setMonth(currentDate.getMonth() + 1);

        // Update display month
        updateDisplayMonth();
    });
}

// Update display month and set up month change when the page loads
window.onload = function() {
    updateDisplayMonth();
    changeMonth();
}
