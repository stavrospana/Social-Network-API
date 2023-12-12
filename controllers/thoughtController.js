const { Thought, User } = require("../models");

module.exports = {
  // Get thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get single thought
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Post thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Put a thought
  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      if (err.name === "ValidationError") {
        return res.status(400).json(err);
      }
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThoughtById(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json({
        message: `Successfully deleted the thought '${thought.thoughtText}'!`,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Post reaction
  async addReaction(req, res) {
    try {
      const reaction = req.body;
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction } },
        { new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete reaction
  async removeReactionById(req, res) {
    try {
      const reactionId = req.params.reactionId;

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json({
        message: `Successfully deleted the reaction with ID: ${reactionId}`,
        thought,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};