const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registeredEvent4Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  fullname: String,
  email: String,
  regno: String,
  college: String,
  branch: String,
  teamname: String,
  domain: String,
  problemStatement: String,
 
});

module.exports = mongoose.model('RegisteredEvent4', registeredEvent4Schema);

