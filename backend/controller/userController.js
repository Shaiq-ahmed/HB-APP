const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

exports.registerUser = asyncHandler(async (req, res) => {
  // const newUser = new User(req.body);

  // try {
  //   const user = await newUser.save();
  //   sendToken(user, 201, res);
  // } catch (error) {
  //   if (error.code === 11000) {
  //     const message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
  //     return res.status(500).json({ message });
  //   }

  //   // Some other error
  //   return res.status(500).json({ message: error });
  // }
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      const message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
      return res.status(500).json({ message: message });
    }

    // Some other error
    return res.status(500).json({ message: error });
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({ error: 'Invalid email or Password' });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      res.status(401).json({ error: 'Invalid email or Password' });
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
