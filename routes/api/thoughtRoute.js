//importing the router module from express
const router = require("express").Router();


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


// Routes for handling HTTP requests related to 'thoughtId' for a specific thought
router;


router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

// Route for adding a reaction to 'thoughtId'
router.route("/:thoughtId/reactions").post(addReaction);

// Route for removing a specific reaction form a thought in 'thoughtId' and 'reactionId'
router.route("/:thoughtId/reactions/:reactionId").delete(removeReactionById);



module.exports = router;