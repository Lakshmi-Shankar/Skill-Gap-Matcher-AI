const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  skills: [
    {
      name: { type: String, required: true },
      level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' }
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', userSchema);
