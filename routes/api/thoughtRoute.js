// Importing the 'Router' module from the 'express' package
const router = require("express").Router();

// Importing controller functions from the 'thoughtController' module
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  removeReactionById,
} = require("../../controllers/thoughtController");

// Routes for handling HTTP requests related to thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Routes for handling HTTP requests related to a specific thought identified by 'thoughtId'
router;
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

// Route for adding a reaction to a specific thought identified by 'thoughtId'
router.route("/:thoughtId/reactions").post(addReaction);

// Route for removing a specific reaction from a specific thought identified by 'thoughtId' and 'reactionId'
router.route("/:thoughtId/reactions/:reactionId").delete(removeReactionById);

// Exporting the configured router
module.exports = router;