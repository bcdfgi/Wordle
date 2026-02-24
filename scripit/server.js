require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require('./router/auth');
app.use('/api/auth', authRoutes);




mongoose.connect('mongodb://127.0.0.1:27017/wordleDatabase')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
