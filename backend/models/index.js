require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODBURI)
const db = mongoose.connection

db.on('connected', () => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})

module.exports = {
    User: require('./user'),
    Journey: require('./journey'),
    Experience: require('./experience')
}