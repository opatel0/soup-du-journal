// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the comment collection
const experienceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        user: { type: mongoose.Types.ObjectId, required: true },
        journey: { type: mongoose.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Experience', experienceSchema);