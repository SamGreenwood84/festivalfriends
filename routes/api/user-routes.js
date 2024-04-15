const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/thought-controllers');

// Define API routes for user-related operations
router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await getAllUsers();
      res.json(users); // Send formatted JSON response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .post(async (req, res) => {
    try {
      const newUser = await createUser(req.body);
      res.json(newUser); // Send formatted JSON response
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const user = await getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user); // Send formatted JSON response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .put(async (req, res) => {
    try {
      const updatedUser = await updateUser(req.params.id, req.body);
      res.json(updatedUser); // Send formatted JSON response
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedUser = await deleteUser(req.params.id);
      res.json(deletedUser); // Send formatted JSON response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Add a route for adding a friend to a user
router
  .route('/:id/friends/:friendId')
  .post(async (req, res) => {
    try {
      const updatedUser = await addFriend(req.params.id, req.params.friendId);
      res.json(updatedUser); // Send formatted JSON response
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  });

// Add a route for removing a friend from a user
router
  .route('/:id/friends/:friendId')
  .delete(async (req, res) => {
    try {
      const updatedUser = await removeFriend(req.params.id, req.params.friendId);
      res.json(updatedUser); // Send formatted JSON response
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  });

module.exports = router;
