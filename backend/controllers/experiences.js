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
router.get('/:experience', (req, res) => {
    db.Experience.findOne({_id: req.params.experience})
        .then(experience => res.json(experience))
})

// append user experiences list 
// append journey list
router.post('/:user/:journey', (req, res) => {
    db.Experience.create({
        title: req.body.title,
        content: req.body.content,
        user: req.params.user,
        journey: req.params.journey
    })
        .then(experience => res.json(experience))
})

router.put('/:experience', (req, res) => {
    db.Experience.findByIdAndUpdate(
        req.params.experience,
        req.body,
        { new: true }
    )
        .then(experience => res.json(experience))
})

// delete from user experiences list 
// delete from journey list
router.delete('/:experience', (req, res) => {
    db.Experience.findByIdAndDelete(req.params.experience)
        .then(() => res.json({deletedCommentId: req.params.experience}))
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router