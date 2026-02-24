const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const GameState = require('../models/GameState');
const mongoose = require('mongoose');

const router = express.Router();



router.post('/signup', async (req, res) => {
    console.log('Signup request body:', req.body);

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.json({
            user_id: user._id,
            user_email: user.email,
            message: 'Login successful',


        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


const client = new OAuth2Client(
    '875738114512-171p73uqojdbmh33fkmv3n9ge1vncjdn.apps.googleusercontent.com'
);

router.post('/google', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        console.log("No token received");
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '875738114512-171p73uqojdbmh33fkmv3n9ge1vncjdn.apps.googleusercontent.com'
        });

        const payload = ticket.getPayload();

        console.log(" Google payload:", payload);

        const email = payload.email;
        const picture = payload.picture;

        console.log(" Google picture from payload:", picture);

        let user = await User.findOne({ email });

        if (!user) {
            const hashedPassword = await bcrypt.hash('google-auth-user', 10);
            user = new User({ email, password: hashedPassword, picture });
            await user.save();
            console.log(" New user created with picture:", picture);
        } else {

            if (!user.picture) {
                user.picture = picture;
                await user.save();
                console.log(" Updated existing user with Google picture");
            }
        }


        res.json({
            message: 'Google sign-in successful',
            user_id: user._id,
            user_email: user.email,
            user_picture: user.picture || picture,
        });

    } catch (err) {
        console.error(" Google verification error:", err);
        res.status(401).json({ message: 'Invalid Google token' });
    }
});









router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/game/save', async (req, res) => {
    const { userId, currentWord, guesses, attemptsLeft, result, timeTaken, wordLength, difficultyLevel} = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
    }

    try {
        const newGame = new GameState({
            userId,
            currentWord,
            guesses,
            attemptsLeft,
            result,
            timeTaken,
            wordLength,
            difficultyLevel
        });

        await newGame.save();
        res.json({ message: 'Game saved successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('/game/load/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
    }

    try {
        const game = await GameState.findOne({ userId });

        if (!game) {
            return res.status(404).json({ message: 'No saved game found' });
        }

        res.json(game);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/game/history/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
    }

    try {
        const games = await GameState.find({ userId })
            .sort({ playedAt: -1 });

        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});






module.exports = router;


