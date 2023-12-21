const router = require("express").Router();

// import the methods from the user controller

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriendById,
} = require("../../controllers/userController");


// get all users and create a user
router.route("/").get(getAllUsers).post(createUser);


// get one user, update one user, and delete one user
router
  .route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);


// add a friend and remove a friend
router
  .route("/:userId/friends/:friendId")
  .post(addFriend)
  .delete(removeFriendById);

module.exports = router;