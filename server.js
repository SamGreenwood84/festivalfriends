const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // For environment variables

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/festivalfriends', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('Connected to MongoDB database.');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Exit the application if unable to connect to the database
});

// Routes
app.use('/user', require('./routes/user-routes'));
app.use('/thought', require('./routes/thought-routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
