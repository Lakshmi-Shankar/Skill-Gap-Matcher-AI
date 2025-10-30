const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new user
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update user skills
router.put("/:id/skills", async (req, res) => {
    const { skills } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { skills },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Skills updated successfully', user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;