const { User } = require("../models");

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
    User.findById(req.params.id) // Changed req.params.userId to req.params.id
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
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }) // Changed req.params.userId to req.params.id
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
    User.findOneAndDelete({ _id: req.params.id }) // Changed req.params.userId to req.params.id
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
  }
};

module.exports = userController;
