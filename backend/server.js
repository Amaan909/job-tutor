require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const generateInterviewReport = require('./src/services/ai.service');
const { jobDescription, selfDescription, resumeText } = require('./src/temp.js');

// Connect to MongoDB
connectDB();

// generateInterviewReport({ resume: resumeText, jobDescription, selfDescription });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});