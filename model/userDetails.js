const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userDetailsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  college: {
    type: String
  },
  course: {
    type: String
  },
  year: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('UserDetails', userDetailsSchema);
