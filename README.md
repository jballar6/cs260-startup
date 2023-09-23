# Startup: The Lift Log

## Description deliverable

### Elevator pitch
Tracking your reps and weights is essential for progressing in the gym, but using notes apps and cluttered bullet point lists or Excel spreadsheets to track this progress is more difficult than it needs to be. The Lift Log makes recording your weights seamless. You just put in your most recent weight and reps for a workout, and the Lift Log will take care of the rest. Then, the Lift Log makes it effortless to to see where your strength is at.

### Design

![Mock](mobile-ui-mockup.png)

Here is a mockup of the Lift Log running on an iPhone after the user has logged in. 

### Key features

- Secure login over HTTPS
- Persistently stored record of workouts with most recent weight and rep count for each workout
- Quick add option that allows user to either add a workout if not in database or search and update a current workout
- User can delete workouts from their Log
- Leaderboard page where users can view friend's workouts

### Technologies

I will use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Three HTML pages. One for login, one for the user's Log, and one for viewing friend's Logs. Hyperlinks connect each page.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, choice display, applying votes, display other users votes, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving stored workouts
  - inputting new workouts
  - viewing friend's Logs
- **DB** - Store users and logs of workouts in database.
- **Login** - Register and login users. Credentials securely stored in database.
- **WebSocket** - Saved workouts are made available to see by user's friends.
- **React** - Application ported to use the React web framework.
