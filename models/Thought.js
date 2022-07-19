// Using mongoose to build the Thought model
const { Schema, model } = require('mongoose');

// this imports the mongoose schema and creates the fields that will be used
const ThoughtSchema = new Schema({

});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;