const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction // New function for adding a reaction
} = require('../controllers/thought-controller');

// Define API routes for thought-related operations
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Add a route for adding a reaction to a specific thought
router
  .route('/:id/reactions') // Use the same thought ID parameter as in other routes
  .post(addReaction); // Use the addReaction function from the controller

module.exports = router;
