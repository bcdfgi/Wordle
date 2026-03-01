
# 🎮 Wordle Game – Full Stack MERN App

A full-stack, responsive Wordle-inspired word guessing game built with the **MERN** stack. This project features secure authentication, persistent game state, and a dynamic difficulty system.

---

### 🔗 Quick Links
* **Live App:** [Wordle Live Demo](https://wordle-livid-zeta.vercel.app/Wordle.html)
* **GitHub Repository:** [Source Code](https://github.com/bcdfgi/Wordle)

---

## 🚀 Key Features

* **Custom Difficulty:** Choose your word length (3–6 letters) and difficulty level (Easy/Medium/Hard).
* **Secure Auth:** Full integration with **Google OAuth 2.0** for a seamless sign-in experience, with a guest mode fallback.
* **Persistent Progress:** Track your game history and scores stored securely in the cloud.
* **Dynamic UI:** Interactive feedback with color-coded guesses (Green/Yellow/Grey).
* **Production-Ready:** Fully deployed and optimized for performance on **Vercel**.

---

## 🏗 Architectural Overview

The application follows a structured MERN architecture, separating concerns for scalability and security:

* **Backend:** Node.js & Express.js managing API endpoints and middleware.
* **Frontend:** Vanilla JS, HTML5, and CSS3 for a lightweight, high-performance interface.
* **Database:** MongoDB Atlas (Cloud) for storing user profiles and game history.
* **Security:** JWT-based authentication combined with Google OAuth for protected route access.



---

## 🛠 Local Development Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone [https://github.com/bcdfgi/Wordle.git](https://github.com/bcdfgi/Wordle.git)
cd Wordle
npm install express dotenv

```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id

```

### 4. Running the Server

Start the development environment:

```bash
node server.js

```

---

## 🧠 Game Logic & Rules

After each guess, the game processes the input against the secret word:

* 🟩 **Green:** Correct letter & correct position.
* 🟨 **Yellow:** Correct letter, wrong position.
* ⬜ **Grey:** Letter not in word.

**Difficulty Scaling:**

* **Easy:** 6 chances
* **Medium:** 4 chances
* **Hard:** 3 chances

---

## 📈 What I Learned

* **Authentication:** Mastering OAuth flows and managing session state in a stateless backend.
* **Database Design:** Implementing Mongoose schemas for complex user-game relationships.
* **Deployment:** Debugging and optimizing full-stack deployments on Vercel.
* **Security:** Protecting sensitive API routes using JWT middleware.

---

## 🔮 Future Improvements

* **Global Leaderboard:** Implement a real-time ranking system.
* **Daily Challenge Mode:** A shared daily word for all users.
* **Multiplayer Support:** Head-to-head word guessing.

---

### 👩‍💻 Author

**Neha Kondabathini** | Adelaide, Australia

[nehakondabathini1234@gmail.com](mailto:nehakondabathini1234@gmail.com)









