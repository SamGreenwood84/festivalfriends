// Import mongoose library
const mongoose = require('mongoose');

// Destructure Schema from mongoose
const { Schema } = mongoose;

// Define the schema for the Thought model
const thoughtSchema = new Schema({
  // Define the thoughtText field
  thoughtText: {
    type: String, // Data type is string
    required: true, // Field is required
    minLength: 1, // Minimum length of 1 character
    maxLength: 280 // Maximum length of 280 characters
  },
  // Define the createdAt field
  createdAt: {
    type: Date, // Data type is date
    default: Date.now, // Default value is the current timestamp
    // Getter method to format the timestamp to ISO string format
    get: (createdAtVal) => new Date(createdAtVal).toISOString()
  },
  // Define the username field
  username: {
    type: String, // Data type is string
    required: true // Field is required
  },
  // Define the reactions field as an array of nested documents
  reactions: [
    {
      // Define the reactionId field
      reactionId: {
        type: Schema.Types.ObjectId, // Data type is ObjectId
        default: () => new mongoose.Types.ObjectId() // Default value is a new ObjectId
      },
      // Define the reactionBody field
      reactionBody: {
        type: String, // Data type is string
        required: true, // Field is required
        maxLength: 280 // Maximum length of 280 characters
      },
      // Define the username field within the reaction subdocument
      username: {
        type: String, // Data type is string
        required: true // Field is required
      },
      // Define the createdAt field within the reaction subdocument
      createdAt: {
        type: Date, // Data type is date
        default: Date.now, // Default value is the current timestamp
        // Getter method to format the timestamp to ISO string format
        get: (createdAtVal) => new Date(createdAtVal).toISOString()
      }
    }
  ]
});

// Define a virtual property to get the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length; // Returns the length of the reactions array
});

// Create the Thought model using the thoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;
