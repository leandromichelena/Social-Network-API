const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((thoughtDbData) => res.json(thoughtDbData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one thought by id
    getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((thoughtDbData) => {
                if (!thoughtDbData) {
                    res.status(404).json({
                        message: "No thought found for this id",
                    });
                    return;
                }
                res.json(thoughtDbData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    
    // create thought
    addThoughts({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.user_id },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((thoughtDbData) => {
                if (!thoughtDbData) {
                    res.status(404).json({
                        message: "No user found with this id!",
                    });
                    return;
                }
                res.json(thoughtDbData);
            })
            .catch((err) => res.json(err));
    },

    // update thought by id
    updateThoughts({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((thoughtDbData) => {
                if (!thoughtDbData) {
                    res.status(404).json({
                        message: "No thoughts found for this id",
                    });
                    return;
                }
                res.json(thoughtDbData);
            })
            .catch((err) => res.json(err));
    },

    // delete thought
    deleteThoughts({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((thoughtDbData) => {
                if (!thoughtDbData) {
                    res.status(404).json({
                        message: "No thoughts found for this id",
                    });
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: parmas.userId },
                    { $pull: { thoughts: params.Id } },
                    { new: true }
                );
            })
            .then((userDbData) => {
                if (!userDbData) {
                    res.status(404).json({
                        message: "No User found for this id",
                    });
                    return;
                }
                res.json(userDbData);
            })
            .catch((err) => res.json(err));
    },

    // add a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then((thoughtDbData) => {
                if (!thoughtDbData) {
                    res.status(404).json({
                        message: "No thought found for this id",
                    });
                    return;
                }
                res.json(thoughtDbData);
            })
            .catch((err) => res.status(400).json(err));
    },

    // delete a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((thoughtDbData) => res.json(thoughtDbData))
            .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;