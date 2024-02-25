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
    db.User.findOne({_id: req.params.user})
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
        {new: true}
    )
        .then(user => res.json(user))
})

// Delete all journeys and experiences associate with user
router.delete('/:user', async (req, res) => {
    await db.User.findByIdAndDelete(req.params.user)
        .then( async (user) => {
            for (let journey of user.journeys) {
                await db.Journey.findByIdAndDelete(journey)
                    .then(deletedJourney => console.log(deletedJourney))
            }
            await res.json({user})
    })
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router