const { User, Thought } = require("../models");

module.exports = {
  // Get requestr for all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get request for a  single user
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate({
          path: "thoughts", // populate the thought field for the user
          select: "-__v", // exclude the __v field
        })
        .populate({
          path: "friends", // populate the friends field for the user
          select: "-__v", // exclude the __v field
        });

      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Post request for a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Put request for a user
  async updateUserById(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      if (err.name === "ValidationError") {
        return res.status(400).json(err);
      }
      res.status(500).json(err);
    }
  },
  // Deletes a user
  async deleteUserById(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      // remove the user from any friends arrays
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({
        message: `Successfully deleted user '${user.username}' and associated thoughts!`,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Post request for a friend
  async addFriend(req, res) {
    try {
      const friendId = req.params.friendId;

      const friend = await User.findOne({ _id: friendId });
      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend found with this id!" });
      }
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      const response = {
        userId: user._id,
        username: user.username,
        addedFriend: {
          userId: friend._id,
          username: friend.username,
        },
        message: `Successfully added ${friend.username} to ${user.username}'s friends list!`,
      };
      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Deletes a friend
  async removeFriendById(req, res) {
    try {
      const friendId = req.params.friendId;

      const friend = await User.findOne({ _id: friendId });
      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend found with this id!" });
      }

      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }

      const isFriend = user.friends.includes(friendId);

      if (!isFriend) {
        return res
          .status(400)
          .json({ message: "These users are not friends!" });
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: friendId } },
        { new: true }
      );

      res.json({
        message: `Successfully removed ${friend.username} from ${user.username}'s friends list!`,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};