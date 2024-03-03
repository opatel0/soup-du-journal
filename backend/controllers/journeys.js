/* Require modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple');
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Require the JWT config
--------------------------------------------------------------- */
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
// Index journeys by searched user
router.get('/:user/journeys', (req, res) => {
    db.Journey.find({ user: req.params.user })
        .then(journeys => res.json(journeys))
})

// Index journeys by authenticated user
router.get('/', authMiddleware, (req, res) => {
    db.Journey.find({ user: req.user.id })
        .then(journeys => res.json(journeys))
})

// Show journey
router.get('/:journey', (req, res) => {
    db.Journey.findById(req.params.journey)
        .then(journey => res.json(journey))
})

// Create new journey and append id to user journeys list
router.post('/', authMiddleware, async (req, res) => {
    await db.Journey.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id
    })
        .then(async journey => {
            await db.User.findByIdAndUpdate(
                req.user.id,
                { $push: {journeys: journey._id}},
                { new: true }
            )
                .then(() => res.json(journey))
        })
})

// Edit journey
router.put('/:journey', authMiddleware, async (req, res) => {
    await db.Journey.findByIdAndUpdate(
        req.params.journey,
        req.body,
        { new: true }
    )
        .then(journey => {
            journey.experiences.forEach(async experience => {
                await db.Experience.findByIdAndUpdate(
                    experience,
                    { journeyTitle: journey.title },
                    { new: true }
                )
            })
            res.json(journey)
        })
})

// Delete journey, exeriences associated with journey, and associated journies per user
router.delete('/:journey', async (req, res) => {
    await db.Journey.findByIdAndDelete(req.params.journey)
        .then(async journey => {
            await db.User.findByIdAndUpdate(
                journey.user,
                { $pull: { journeys: journey._id }},
                { new: true }
            )
            .then(user => {
                journey.experiences.forEach(async experience => {
                    await db.Experience.findByIdAndDelete(experience)
                    await db.User.findByIdAndUpdate(
                        user._id,
                        { $pull: { experiences: experience._id }},
                        { new: true }
                    )
                })
                res.json(user)
            })
        })
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router