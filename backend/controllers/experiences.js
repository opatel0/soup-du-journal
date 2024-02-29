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
router.post('/:user/:journey', async (req, res) => {
    await db.User.findById(req.params.user)
        .then(async user => {
            await db.Journey.findById(req.params.journey)
                .then(async journey => {
                    await db.Experience.create({
                        title: req.body.title,
                        content: req.body.content,
                        journeyTitle: journey.title,
                        username: user.username,
                        userId: req.params.user,
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