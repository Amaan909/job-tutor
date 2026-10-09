const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required:[true, 'token is required']
  }},
  { timestamps: true });

// Automatically remove blacklisted tokens once the JWT (1d expiry) is no longer valid.
tokenBlacklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

const tokenBlacklistModel = mongoose.model('tokenBlacklist', tokenBlacklistSchema);

module.exports = tokenBlacklistModel;