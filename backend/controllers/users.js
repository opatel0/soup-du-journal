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
    ).then(user => res.json(user))
})

router.delete('/:user', (req, res) => {
    db.User.findByIdAndDelete(req.params.user)
        .then(() => res.json({deletedCommentId: req.params.user}))
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router