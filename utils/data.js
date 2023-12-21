const names = [
    "Olivia",
    "Liam",
    "Sophia",
    "Noah",
    "Ava",
    "Jackson",
    "Isabella",
    "Lucas",
    "Emma",
    "Aiden",
    "Mia",
    "Ethan",
    "Amelia",
    "Logan",
    "Ella",
    "Carter",
    "Grace",
    "Benjamin",
    "Lily",
    "Henry",
  ];
  
  const thoughts = [
    "The journey of a thousand miles begins with a single step.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "In the middle of difficulty lies opportunity.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Strive not to be a success, but rather to be of value.",
    "The best way to predict the future is to create it.",
    "Do not wait to strike till the iron is hot, but make it hot by striking.",
    "Success is stumbling from failure to failure with no loss of enthusiasm.",
    "The only person you are destined to become is the person you decide to be.",
    "It does not matter how slowly you go as long as you do not stop.",
    "The only impossible journey is the one you never begin.",
    "You miss 100% of the shots you don't take.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Your time is limited, don't waste it living someone else's life.",
    "Life is what happens when you're busy making other plans.",
    "Don't count the days, make the days count.",
    "Happiness is not something ready-made. It comes from your own actions.",
  ];
  
  const reactions = [
    "👏 Bravo!",
    "🎉 That's amazing!",
    "😲 I can't believe it!",
    "🌟 Incredible!",
    "👍 Impressive!",
    "🙌 Wow!",
    "👌 Fantastic!",
    "🤩 Unbelievable!",
    "👏 Well done!",
    "👊 Marvelous!",
    "🎊 Astonishing!",
    "🏆 Outstanding!",
    "👏 Superb!",
    "👍 Excellent!",
    "👏 Remarkable!",
    "👍 Kudos!",
    "🚀 Awesome!",
    "👌 Great job!",
    "👍 Thumbs up!",
    "💪 You nailed it!",
  ];
  
  const users = [];
  
  // Function to create email from the names array
  const generateEmail = (username) => {
    return `${username}@example.com`;
  };
  
  // Function to get a random item from an array
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Function to generate a random username that is in the array above
  const getRandomUsername = () =>
    `${getRandom(names).split(" ")[0].toLowerCase()}${Math.floor(
      Math.random() * 10000
    )}`;
  
  // Function that will generate a list of users
  const generateUser = () => {
    const users = [];
  
    for (let i = 0; i < 20; i += 1) {
      const username = getRandomUsername();
      const email = generateEmail(username);
      const user = {
        username,
        email,
      };
  
      users.push(user);
    }
  
    return users;
  };
  
  // Function to get a random thought from the thoughts array
  const getRandomThought = () => getRandom(thoughts);
  
  // Function to get a random reaction from the reactions array
  const getRandomReaction = () => getRandom(reactions);
  
  // Function to generate a random date
  const getRandomDate = () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate.toISOString().split("T")[0];
  };
  
  // Function to generate a list of thoughts with associated reactions
  const generateThoughts = (int) => {
    const thoughtData = [];
    let date = getRandomDate();
  
    for (let i = 0; i < int; i++) {
      const thought = {
        thoughtText: getRandomThought(),
        createdAt: date,
        username: getRandomUsername(),
        reactions: [],
      };
  
      const numberOfReactions = Math.floor(Math.random() * 10) + 1;
  
      for (let j = 0; j < numberOfReactions; j++) {
        const reaction = {
          reactionBody: getRandomReaction(),
          username: getRandomUsername(),
          createdAt: date,
        };
  
        thought.reactions.push(reaction);
      }
  
      thoughtData.push(thought);
    }
  
    return thoughtData;
  };
  

  module.exports = { generateUser, generateThoughts };