const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tweetSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet
