'use strict';
// load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const User = db.models.User;
const Course = db.models.Course
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

//Use method to parse JSON
app.use(express.json());

//use bodyPAreser package to parse information on the request object
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//enable CORS Requests
app.use(cors());

// use express router
app.use('/api', routes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

//User model


(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log('Connection to the database successful!');

  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();
