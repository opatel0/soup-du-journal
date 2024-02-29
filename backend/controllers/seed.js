/* Require modules
---------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require models, define variables
---------------------------------------------------------- */
const db = require('../models')
const seedData = db.Seed.seedData


/* Routes
---------------------------------------------------------- */
router.get('/', (req, res) => {
    let journeyParserOffset = 0
    let experienceParserOffset = 0
    seedData.users.forEach(async user => {
        await db.User.create({
            username: user.username,
            password: user.password
        })
        .then(async user =>  {
            for (let i=0; i<2; i++) {
                seedData.journeys
                .slice(i+journeyParserOffset, i+journeyParserOffset+1)
                .forEach(async journey => {
                    await db.Journey.create({
                        title: journey.title,
                        description: journey.description,
                        user: user._id
                    })
                    .then(async journey => {
                        await db.User.findByIdAndUpdate(
                            user._id,
                            { $push: { journeys: journey._id }},
                            { new: true }
                        )
                        for (let i=0; i<3; i++) {
                            seedData.experiences
                            .slice(i+experienceParserOffset, i+experienceParserOffset+1)
                            .forEach(async experience => {
                                await db.Experience.create({
                                    title: experience.title,
                                    content: experience.content,
                                    journeyTitle: journey.title,
                                    username: user.username,
                                    userId: user._id,
                                    journeyId: journey._id,
                                })
                                .then(async experience => {
                                    await db.User.findByIdAndUpdate(
                                        user._id,
                                        { $push: { experiences: experience._id }},
                                        { new: true }
                                    )
                                    await db.Journey.findByIdAndUpdate(
                                        journey._id,
                                        { $push: { experiences: experience._id }},
                                        { new: true }
                                    )
                                })
                            })
                        }
                        experienceParserOffset = experienceParserOffset+3
                    })
                })
            }
            journeyParserOffset = journeyParserOffset+2
        })
    })
    res.json(seedData)
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router