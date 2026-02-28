Wordle Game – Full Stack MERN App

A full-stack Wordle-inspired word guessing game built using Node.js, Express, and MongoDB Atlas, featuring secure authentication (JWT + Google OAuth), score tracking, and persistent game state.

This project demonstrates backend development, authentication systems, database integration, and deployment to production using Vercel.

Live Demo

Live App: https://wordle-livid-zeta.vercel.app/Wordle.html
GitHub Repository: https://github.com/bcdfgi/Wordle


Features

The User can choose the word-length and the difficulty level 
The User is able to Sign-in with their email or Play as a guest if they choose
The User is able to view their game history if they are logged-in with their google account
The User can choose whether they want to play a new game or not at the end of the game.
The Game is deployed using Vercel

Tech Stack

Frontend
1. HTML5
2. CSS3
3. Vanilla JavaScript

Backend
1. Node.js
2. 2.Express.js

Database
1. MongoDB Atlas (Cloud Database)

Authentication
1. Google OAuth 2.0

Deployment

1. Vercel

Architecture

The application follows a structured backend design:

Routes which handle API endpoints
Models which contains Mongoose schemas like User information and their Game History
Database which contains data MongoDB Atlas

Game state and user scores are stored in MongoDB and retrieved securely using JWT-based authentication middleware.


Local Development Setup

Clone the repository
 Clone the repository using this command
 git clone https://github.com/bcdfgi/Wordle.git

 Install npm

install npm using this command:
npm install

install express using this command:
npm install express

install node using this command:
nvm install node

install dotenv using this command
npm install dotenv



Create a .env file

Add the following:


MONGO_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id

Run the development server

node server.js


Game Logic Overview

Player can select the word length(User can choose word length from 3-6) and the 
difficutly level(User can choose diffuculty level: Easy(6 chances), Medium(4 chances), Hard(3 chances)).
After each guess:

   🟩 Green = Correct letter & correct position
   🟨 Yellow = Correct letter, wrong position
   ⬜ Grey = Letter not in word
When game ends:
Score updates in MongoDB Atlas
The user is asked they want to try again:
1. If the user selects yes the game would restart.
2. If the user selects no the game would end(if the user has decided to play the game as a guest they would be taken to the sign-in
3. and if they signed in through their google account they are taken to their game history page.)


Security Features
1. Protected API routes with middleware were used.
2. OAuth token verification for Google login was used for authentication
3. Environment variables used for sensitive keys


Future Improvements
1. Global leaderboard
2. Daily challenge mode
3. Multiplayer support
4. Manual Sign-in


What I Learned

Implementing secure authentication with OAuth
Managing user sessions in a stateless backend
Structuring a Node.js backend using routes and models
Debugging production deployment issues on Vercel
Connecting and managing MongoDB Atlas clusters


👩‍💻 Author

Neha Kondabathini
Adelaide, Australia
[nehakondabathini1234@gmail.com](mailto:nehakondabathini1234@gmail.com)


