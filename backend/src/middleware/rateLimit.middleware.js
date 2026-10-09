const rateLimit = require('express-rate-limit');

// Limit repeated auth attempts (brute-force / abuse protection).
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, please try again later.' },
});

module.exports = { authLimiter };
