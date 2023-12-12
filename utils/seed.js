const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");
const { generateUser, generateThoughts } = require("./data");

// Handling MongoDB connection errors
connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Checking if the 'thoughts' collection exists and dropping it if it does
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  // Checking if the 'users' collection exists and dropping it if it does
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  // Generating user and thought data
  const users = generateUser();
  const thoughts = generateThoughts(20);

  // Inserting generated user and thought data into their respective collections
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});