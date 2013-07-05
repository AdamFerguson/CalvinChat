var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  userName: String,
  content: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);