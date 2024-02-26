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

// append user experiences list - DONE
// append journey list - DONE
router.post('/:user/:journey', async (req, res) => {
    db.Experience.create({
        title: req.body.title,
        content: req.body.content,
        user: req.params.user,
        journey: req.params.journey
    })
        .then(async experience => {
            await db.Journey.findByIdAndUpdate(
                req.params.journey,
                {$push: {experiences: experience._id}},
                {new: true}
            )
            .then(async () => {
                await db.User.findByIdAndUpdate(
                    req.params.user,
                    {$push: {experiences: experience._id}},
                    {new: true}
                )
                res.json(experience)
            })
        })
})

router.put('/:experience', (req, res) => {
    db.Experience.findByIdAndUpdate(
        req.params.experience,
        req.body,
        { new: true }
    )
        .then(experience => res.json(experience))
})

// delete from user experiences list - DONE
// delete from journey list - DONE
router.delete('/:experience', async (req, res) => {
    await db.Experience.findByIdAndDelete(req.params.experience)
        .then(async experience => await db.Journey.findByIdAndUpdate(
            experience.journey,
            { $pull: { experiences: req.params.experience }},
            { new: true }
        )
            .then(async () => await db.User.findByIdAndUpdate(
                experience.user,
                { $pull: { experiences: req.params.experience }},
                { new: true }
            ))
                .then(() => res.json(experience))
)})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router