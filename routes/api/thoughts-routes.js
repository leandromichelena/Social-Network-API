const router = require('express').Router();
const { getAllThoughts, addThoughts, getThoughtsById, updateThoughts, deleteThoughts, addReaction, deleteReaction
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThoughts);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// Route to add a new reaction
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// Route to delete a reaction given the ID
router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;