const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on  http://localhost:${PORT}`);
    });
    console.log('🌐 Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})
