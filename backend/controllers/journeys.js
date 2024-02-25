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
router.get('/:user/journeys', (req, res) => {
    db.Journey.find({user: req.params.user})
        .then(journeys => res.json(journeys))
})

router.get('/:journey', (req, res) => {
    db.Journey.findOne({_id: req.params.journey})
        .then(journey => res.json(journey))
})

// append user journey list - DONE
router.post('/:user', async (req, res) => {
    await db.Journey.create({
        description: req.body.description,
        user: req.params.user
    })
        .then(async journey => {
            await db.User.findByIdAndUpdate(
                req.params.user,
                { $push: {journeys: journey._id}}
            )
                .then(() => res.json(journey))
        })
})

router.put('/:journey', (req, res) => {
    db.Journey.findByIdAndUpdate(
        req.params.journey,
        req.body,
        {new: true}
    )
        .then(journey => res.json(journey))
})

// delete associated journies from user - DONE
// delete associated experiences 
router.delete('/:journey', async (req, res) => {
    await db.Journey.findByIdAndDelete(req.params.journey)
        .then(async (journey) => {
            await db.User.findByIdAndUpdate(
                journey.user,
                {$pull: {journeys: journey._id}},
                {new: true}
            )
            .then(async (user) => await res.json(user))
        })
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router