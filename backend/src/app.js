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

module.exports = app;