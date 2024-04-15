const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction // New function for adding a reaction
} = require('../../controllers/thought-controllers');

// Define API routes for thought-related operations
router
  .route('/')
  .get(async (req, res) => {
    try {
      const thoughts = await getAllThoughts();
      res.json(thoughts); // Send formatted JSON response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .post(async (req, res) => {
    try {
      const newThought = await createThought(req.body);
      res.json(newThought); // Send formatted JSON response
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const thought = await getThoughtById(req.params.id);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought); // Send formatted JSON response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .put(async (req, res) => {
    try {
      const updatedThought = await updateThought(req.params.id, req.body);
      res.json(updatedThought); // Send formatted JSON response
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedThought = await deleteThought(req.params.id);
      res.json(deletedThought); // Send formatted JSON response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Add a route for adding a reaction to a specific thought
router
  .route('/:id/reactions') // Use the same thought ID parameter as in other routes
  .post(async (req, res) => {
    try {
      // Assuming you have a function to add a reaction
      const updatedThought = await addReaction(req.params.id, req.body.reaction);
      res.json(updatedThought); // Send formatted JSON response
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  });

module.exports = router;
