const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: Number,
  website: String,
  introduction: String,
  address: String,
  street: String,
  
  // user:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:"User"
  // }
});

module.exports = mongoose.model('Customer', customerSchema);
