const userModel = require('../models/user.model');
const tokenBlacklistModel = require('../models/blacklist.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUserName = await userModel.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const existingUserEmail = await userModel.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token)

    return res.status(201).json({ message: 'User registered successfully', user:{
      id: user._id,
      username: user.username,
      email: user.email
    }  });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function loginUserController(req, res) {
  try{
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token)

    return res.status(200).json({ message: 'User logged in successfully', user:{
      id: user._id,
      username: user.username,
      email: user.email
    }  });
  }
  catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function logoutUserController(req, res) {
  try{
    const token = req.cookies.token;

    if(!token){
      return res.status(400).json({ message: 'No token provided' });
    }

    await tokenBlacklistModel.create({ token });
    res.clearCookie('token');
    return res.status(200).json({ message: 'User logged out successfully' });
  }
  catch (error) {
    console.error('Error logging out user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getMeController(req, res) {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User details fetched successfully',
      user:{
      id: user._id,
      username: user.username,
      email: user.email
    } });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController
}