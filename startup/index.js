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

// Placeholder for database connection

//// GetWorkouts
//apiRouter.get('/workouts', (_req, res) => {
  //res.send(workouts);
//});

//// SubmitWorkout
//apiRouter.post('/workouts', (req, res) => {
  //workouts = updateWorkouts(req.body, workouts);
  //res.send(workouts);
//});

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
