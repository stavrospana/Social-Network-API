const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Thought Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Virtual to get the length of the thought's reactions array
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create model using the schema
const Thought = model("Thought", thoughtSchema);

// Export the Thought model
module.exports = Thought;