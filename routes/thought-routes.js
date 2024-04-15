const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought
} = require('../controllers/thought-controller'); // Adjust the path to match your file structure

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

module.exports = router;
