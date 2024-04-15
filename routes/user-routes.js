const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend, // New function for adding a friend
  removeFriend // New function for removing a friend
} = require('../controllers/user-controllers'); // Adjust the path to match your file structure

// Define API routes for user-related operations
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Add a route for adding a friend to a user
router
  .route('/:id/friends/:friendId') // Use the same user ID parameter as in other routes
  .post(addFriend); // Use the addFriend function from the controller to add a friend

// Add a route for removing a friend from a user
router
  .route('/:id/friends/:friendId')
  .delete(removeFriend); // Use the removeFriend function from the controller to remove a friend

module.exports = router;
