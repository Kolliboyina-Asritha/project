const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registered3EventSchema = new Schema({
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

module.exports = mongoose.model('RegisteredEvent3', registered3EventSchema);

