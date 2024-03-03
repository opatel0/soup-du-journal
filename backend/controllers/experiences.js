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
// Index all experiences for public feed
router.get('/', (req, res) => {
    db.Experience.find({})
        .then(experiences => res.json(experiences))
})

// Index experiences per user
router.get('/:user/userexperiences', (req, res) => {
    db.Experience.find({ userId: req.params.user })
        .then(experiences => res.json(experiences))
})

// Index experiences per journey
router.get('/:journey/journeyexperiences', (req, res) => {
    db.Experience.find({ journeyId: req.params.journey })
        .then(experiences => res.json(experiences))
})

// Show experience
router.get('/:experience', (req, res) => {
    db.Experience.findById(req.params.experience)
        .then(experience => res.json(experience))
})

// Create experience and append to user/journey lists
router.post('/:journey', authMiddleware, async (req, res) => {
    await db.User.findById(req.user.id)
        .then(async user => {
            await db.Journey.findById(req.params.journey)
                .then(async journey => {
                    await db.Experience.create({
                        title: req.body.title,
                        content: req.body.content,
                        journeyTitle: journey.title,
                        username: user.username,
                        userId: user._id,
                        journeyId: req.params.journey
                    })
                        .then(async experience => {
                            await db.Journey.findByIdAndUpdate(
                                req.params.journey,
                                { $push: { experiences: experience._id }},
                                { new: true }
                            )
                            .then(async () => {
                                await db.User.findByIdAndUpdate(
                                    req.params.user,
                                    { $push: { experiences: experience._id }},
                                    { new: true }
                                )
                                res.json(experience)
                            })
                        })
                })
        })
})

// Edit experience
router.put('/:experience', (req, res) => {
    db.Experience.findByIdAndUpdate(
        req.params.experience,
        req.body,
        { new: true }
    )
        .then(experience => res.json(experience))
})

// Delete experience and remove from user/journey lists
router.delete('/:experience', async (req, res) => {
    await db.Experience.findByIdAndDelete(req.params.experience)
        .then(async experience => await db.Journey.findByIdAndUpdate(
            experience.journeyId,
            { $pull: { experiences: req.params.experience }},
            { new: true }
        )
            .then(async () => await db.User.findByIdAndUpdate(
                experience.userId,
                { $pull: { experiences: req.params.experience }},
                { new: true }
            ))
                .then(() => res.json(experience))
)})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router