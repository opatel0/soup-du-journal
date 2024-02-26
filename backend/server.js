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
--------------------------------------------------------------- */
const usersCtrl = require('./controllers/users')
const journeysCtrl = require('./controllers/journeys')
const experiencesCtrl = require('./controllers/experiences')


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


/* Mount routes
---------------------------------------------------------- */
app.get('/', (req, res) => {
    db.Experience.find({})
        .then(experiences => res.json(experiences))
})
app.use('/api/users', usersCtrl)
app.use('/api/journeys', journeysCtrl)
app.use('/api/experiences', experiencesCtrl)


/* Tell the app to listen on the specified port
---------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});