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

// Initialize date
let today = new Date();

// API endpoint to get username
//apiRouter.post('/user', (req, res) => {
  //user = req.json(user);
//});
let user = "user"

// Initialize userlogs
let userlogs = {};

// Initialize the user's log
userlogs[user] = {};

// API endpoint to get userlogs
apiRouter.get('/userlogs', (_req, res) => {
  res.json(userlogs[user]);
});

// API endpoint to update userlogs
apiRouter.post('/userlogs', (req, res) => {
  updateUserlogs(req.body, userlogs);
  res.json(userlogs[user]);
});

// Placeholder for database connection

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


function updateUserlogs(newWorkout, userlogs) {
    userlogs[user][today] = [];
    userlogs[user][today].push(newWorkout);
}
