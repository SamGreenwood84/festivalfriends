const { User } = require('../models');

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts')
      .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a single user by its id
  getUserById(req, res) {
    User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a user by its id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a user by its id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        // BONUS: Remove user's associated thoughts
        // You may implement this as per your project requirements
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

module.exports = userController;
