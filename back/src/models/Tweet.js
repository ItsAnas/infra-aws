const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true
  },
  group: String,
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet