// Using mongoose to build the user model
const { Schema, model } = require('mongoose');

// this imports the mongoose schema and creates the fields that will be used
const UserSchema = new Schema({
    
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;