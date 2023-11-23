const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: Number,
  website: String,
  introduction: String,
  address: String,
  street: String,
});

module.exports = mongoose.model('User', userSchema);
