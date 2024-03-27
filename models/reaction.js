// Reaction--SCHEMA ONLY
const mongoose = require('mongoose');

const { Schema } = mongoose;

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId, // Data type is ObjectId
    default: () => new mongoose.Types.ObjectId() // Default value is a new ObjectId
  },
  reactionBody: {
    type: String, // Data type is string
    required: true, // Field is required
    maxLength: 280 // Maximum length of 280 characters
  },
  username: {
    type: String, // Data type is string
    required: true // Field is required
  },
  createdAt: {
    type: Date, // Data type is date
    default: Date.now, // Default value is the current timestamp
    // Getter method to format the timestamp to ISO string format
    get: (createdAtVal) => new Date(createdAtVal).toISOString()
  }
});

module.exports = reactionSchema;
