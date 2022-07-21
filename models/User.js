// Using mongoose to build the user model
const { Schema, model } = require('mongoose');

// this imports the mongoose schema and creates the fields that will be used
const UserSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

UserSchema.virtual("friendCount").get(function () {
    return this.friends ? this.friends.length : 0;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;