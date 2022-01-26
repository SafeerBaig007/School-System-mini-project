const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const adminRoutes = require('./server/routes/admin')
const schoolRoutes = require('./server/routes/school')
const userRoutes = require('./server/routes/user')
const attendanceRoutes = require('./server/routes/attendance')

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning.',
// }));

app.use('/admin', adminRoutes)
app.use('/school', schoolRoutes)
app.use('/user', userRoutes)
app.use('/attendance', attendanceRoutes)

module.exports = app;