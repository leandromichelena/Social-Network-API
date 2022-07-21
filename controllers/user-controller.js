const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then((userDbData) => res.json(userDbData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .select("-__v")
            .then((userDbData) => res.json(userDbData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then((userDbData) => res.json(userDbData))
            .catch((err) => res.json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((userDbData) => {
                if (!userDbData) {
                    res.status(404).json({ message: "No user found for this id" });
                    return;
                }
                res.json(userDbData);
            })
            .catch((err) => res.json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        Thought.deleteMany(
            { userId: params.id })
            .then(() => {
                User.findOneAndDelete(
                    { userId: params.id })
                    .then(response => {
                        if (!response) {
                            res.status(404).json({ message: 'No User found!' });
                            return;
                        }
                        res.json(response);
                    });
            })
            .catch(err => res.json(err));
    },
 
    // add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then((userDbData) => {
                if (!userDbData) {
                    res.status(404).json({ message: 'No user found for this id' });
                    return;
                }
                res.json(userDbData);
            })
            .catch((err) => res.status(400).json(err));
    },

    // remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then((userDbData) => {
                if (!userDbData) {
                    res.status(404).json({ message: 'No user found for this id' });
                    return;
                }
                res.json(userDbData);
            })
            .catch((err) => res.status(400).json(err));
    }
};

module.exports = userController;