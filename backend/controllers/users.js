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
router.get('/:user', (req, res) => {
    db.User.findOne({ _id: req.params.user })
        .then(user => res.json(user))
})

router.post('/signup', (req, res) => {
    db.User.create(req.body)
        .then(user => res.json(user))
})

router.put('/:user', (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.user,
        req.body,
        { new: true }
    )
        .then(user => res.json(user))
})

// Delete all journeys associated with user - DONE
// Delete all experiences associated with user - DONE
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