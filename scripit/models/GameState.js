
const mongoose = require('mongoose');

const gameStateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    currentWord: String,
    guesses: [String],
    wordLength: Number,
    difficultyLevel: Number,
    attemptsLeft: Number,
    result: String,
    timeTaken: Number,
    playedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GameState', gameStateSchema);

