/* Require modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple');
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, models, and jwt config
--------------------------------------------------------------- */
const db = require('../models')
const config = require('../../jwt.config.js')


/* Middleware that checks if a JWT sent from the client is valid.
   Used for all routes that require authorization
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    // Check if the 'Authorization' header is present and has the token
    const token = req.headers.authorization;
    if (token) {
        try {
            // Decode the token using the secret key and add the decoded payload to the request object
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            // Return an error if the token is invalid
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Return an error if the 'Authorization' header is missing or has the wrong format
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
}


/* Routes
---------------------------------------------------------- */
// Show user account info
router.get('/account', authMiddleware, (req, res) => {
    db.User.findById(req.user.id)
        .then(user => res.json(user))
})

// Create new user account
router.post('/signup', (req, res) => {
    db.User.create(req.body)
        .then(user => {
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token })
        })
        .catch(() => {
            res.status(401)
                .json({ message: 'Could not create a new user, try again' })
        })
})

// Authenticate user
router.post('/login', async (req, res) => {
    const foundUser = await db.User.findOne({ username: req.body.username })
    if (foundUser && foundUser.password === req.body.password) {
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({
            token: token,
            username: foundUser.username
        })
    } else {
        res.status(401)
	    .json({ message: 'Could not find user with that email/password' })
    }
})

// Edit user account info
router.put('/:user', (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.user,
        req.body,
        { new: true }
    )
        .then(user => res.json(user))
})

// Delete user account and all associated journeys/experiences
router.delete('/:user', async (req, res) => {
    await db.User.findByIdAndDelete(req.params.user)
        .then(async (user) => {
            user.journeys.forEach(async journey => {
                await db.Journey.findByIdAndDelete(journey)
                    .then(async journey => journey.experiences.forEach(
                        async experience => await db.Experience.findByIdAndDelete(experience)
                    ))
            })
            res.json({ user })
    })
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router