const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
const origins = ["https://skillgapmatcherai.netlify.app", "http://localhost:5173"];
app.use(cors({
    origin: origins,
    credentials: true,
}));
app.use(express.json());
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/jobs", require("./routes/jobRoutes"));

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
