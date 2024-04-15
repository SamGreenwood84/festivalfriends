const mongoose = require('mongoose');
const { User, Thought } = require('../models');

mongoose.connect('mongodb://localhost:27017/festivalfriends', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userData = [
  { username: 'user1', email: 'user1@example.com' },
  { username: 'user2', email: 'user2@example.com' }
  // Add more users as needed
];

const thoughtData = [
    { thoughtText: 'Hello friends these are my thoughts', username: 'user1' },
    { thoughtText: 'Here are more of my thoughts', username: 'user2' },
  // Add more thoughts as needed
];

// Function to seed users and thoughts
async function seedData() {
  try {
    // Insert users
    const users = await User.insertMany(userData);
    console.log('Users seeded:', users);

    // Map user IDs for thought creation
    const userIds = users.map(user => user._id);

    // Insert thoughts with random user IDs
    const thoughts = await Thought.insertMany(thoughtData.map((thought, index) => ({ ...thought, userId: userIds[index] })));
    console.log('Thoughts seeded:', thoughts);

    // Optionally, perform any additional seeding tasks

  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Call the seedData function
seedData();
