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

router.post('/:user', (req, res) => {
    db.Journey.create({
        description: req.body.description,
        user: req.params.user
    })
        .then(journey => res.json(journey))
})

router.put('/:journey', (req, res) => {
    db.Journey.findByIdAndUpdate(
        req.params.journey,
        req.body,
        {new: true}
    )
        .then(journey => res.json(journey))
})

router.delete('/:journey', (req, res) => {
    db.Journey.findByIdAndDelete(req.params.journey)
        .then(() => res.json({deletedCommentId: req.params.journey}))
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router