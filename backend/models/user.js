// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the comment collection
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        journeys: [mongoose.Types.ObjectId],
        experiences: [mongoose.Types.ObjectId],
    }
);

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('User', userSchema);