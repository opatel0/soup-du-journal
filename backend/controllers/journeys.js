/* Require modules
---------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
---------------------------------------------------------- */
const db = require('../models')


/* Routes
---------------------------------------------------------- */
// Index journeys by user
router.get('/:user/journeys', (req, res) => {
    db.Journey.find({ user: req.params.user })
        .then(journeys => res.json(journeys))
})

// Show journey
router.get('/:journey', (req, res) => {
    db.Journey.findById(req.params.journey)
        .then(journey => res.json(journey))
})

// Create new journey and append id to user journeys list
router.post('/:user', async (req, res) => {
    await db.Journey.create({
        description: req.body.description,
        user: req.params.user
    })
        .then(async journey => {
            await db.User.findByIdAndUpdate(
                req.params.user,
                { $push: {journeys: journey._id}},
                { new: true }
            )
                .then(() => res.json(journey))
        })
})

// Edit journey
router.put('/:journey', (req, res) => {
    db.Journey.findByIdAndUpdate(
        req.params.journey,
        req.body,
        { new: true }
    )
        .then(journey => res.json(journey))
})

// Delete journey, exeriences associated with journey, and associated journies per user
router.delete('/:journey', async (req, res) => {
    await db.Journey.findByIdAndDelete(req.params.journey)
        .then(async (journey) => {
            await db.User.findByIdAndUpdate(
                journey.user,
                { $pull: { journeys: journey._id }},
                { new: true }
            )
            .then(user => {
                journey.experiences.forEach(async experience => {
                    await db.Experience.findByIdAndDelete(experience)
                })
                res.json(user)
            })
        })
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router