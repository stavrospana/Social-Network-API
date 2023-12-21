# Module 18 Weekly Challenge - Elevating the Social Network API Experience

## Overview

Discover the dynamic capabilities of MongoDB as the powerhouse behind a sophisticated social media network. This repository not only underscores the efficiency and adaptability of MongoDB but also serves as an immersive showcase for a feature-rich Social Network API. Dive into the heart of mid-back end development, where user, reaction, thought, and friend management seamlessly intertwine within the realms of a MongoDB database.

## Installation Guide

Embark on your journey by downloading the repository files to your local machine and extracting them into a dedicated folder.

## Prerequisites

Before you proceed, ensure that the following tools are readily available on your system:

- **Node:** [Download Node.js](https://nodejs.org/en)
- **MongoDB:** [Get MongoDB](https://www.mongodb.com/)

## Usage Instructions

1. Open a git bash shell (or equivalent) within the repository's directory.
2. Install the application's dependencies by executing `npm install`.
3. Seed the database with sample users using `npm run seed`.
4. Initiate your MongoDB server by typing 'mongod' in a separate git bash instance.
5. Kickstart the application server with `npm run start`.

For seamless interaction with the server, utilize tools like Insomnia. If you wish to inspect the database directly, consider employing MongoDB Compass. The default PORT is set to 3001, and all requests should be directed to "http://localhost:3001/". Backend routes are accessible under "/api," with "/api/users" catering to user-related tasks and "/api/thoughts" facilitating thought-related activities. For a more comprehensive understanding, refer to the "thought-controller.js" and "user-controller.js" files in the /controllers/api folder.

## Licensing

This project operates under the widely embraced MIT license. For additional details, consult the LICENSE file in the repository or visit [opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).
