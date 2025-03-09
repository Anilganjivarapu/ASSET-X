const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // For unique userId generation

const UserSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4, unique: true }, // Auto-generates unique userId
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] } // Restricted roles
});

module.exports = mongoose.model('User', UserSchema);
