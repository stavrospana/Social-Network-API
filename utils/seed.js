const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");
const { generateUser, generateThoughts } = require("./data");

// MongoDB Conneciton error
connection.on("error", (err) => err);

connection.once("open", async () => {
  // Connection to MongoDB
  console.log("connected");


  // Checking to see if the 'thoughts' collection exists and drops it if it does
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }


  // Checking to see if the 'users' collection exists and drops it if it does
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