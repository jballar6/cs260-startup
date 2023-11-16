const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetWorkouts
apiRouter.get('/workouts', async (_req, res) => {
  const workouts = await DB.getWorkouts();
  res.send(workouts);
});

// SubmitWorkouts
apiRouter.post('/workouts', async (req, res) => {
  DB.addWorkout(req.body);
  const workouts = await DB.getWorkouts();
  res.send(workouts);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
