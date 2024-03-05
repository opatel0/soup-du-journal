/* Require modules
---------------------------------------------------------- */
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const path = require('path')


/* Require the db connection, models, and seed data
---------------------------------------------------------- */
const db = require('./models');


/* Require the routes in the controllers folder
---------------------------------------------------------- */
const usersCtrl = require('./controllers/users')
const journeysCtrl = require('./controllers/journeys')
const experiencesCtrl = require('./controllers/experiences')
const seedCtrl = require('./controllers/seed')


/* Create the Express app
---------------------------------------------------------- */
const app = express();


/* Middleware (app.use)
---------------------------------------------------------- */
// cross origin allowance
app.use(cors())
// body parser - used for POST/PUT/PATCH routes:
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// use the React build folder for static files
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')))


/* Mount routes
---------------------------------------------------------- */
app.use('/api/seed', seedCtrl)
app.use('/api/users', usersCtrl)
app.use('/api/journeys', journeysCtrl)
app.use('/api/experiences', experiencesCtrl)
// Any other route not matching the routes above gets routed by React
app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});


/* Tell the app to listen on the specified port
---------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});