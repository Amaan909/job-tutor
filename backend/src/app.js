const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true // Allow cookies to be sent
}));

app.use('/api/auth', authRouter); // Import auth routes
app.use('/api/interview', interviewRouter); // Import interview routes

// Centralized error handler (handles multer upload/file-type errors, etc.)
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error('Unhandled error:', err.message);
    const status = err.status || (err.name === 'MulterError' ? 400 : 500);
    return res.status(status).json({ message: err.message || 'Internal server error' });
});

module.exports = app;