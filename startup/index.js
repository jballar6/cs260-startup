const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Initialize userlogs
let userlogs = {};

// API endpoint to get userlogs
apiRouter.get('/userlogs', (_req, res) => {
  res.json(userlogs);
});

// API endpoint to update userlogs
apiRouter.post('/userlogs', (req, res) => {
  userlogs = req.body;
  res.json(userlogs);
});

// Placeholder for database connection

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


//let workouts = [];
//function updateWorkouts(newWorkout, workouts) {
    //// Check if workout is not empty
    //if (newWorkout) {
        //// Create a new workout object
        //const workout = { workout: newWorkout, date: new Date() };
        //workouts.push(workout);
    //}
    //return workouts;
//}
