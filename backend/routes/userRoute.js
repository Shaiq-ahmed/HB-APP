const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require('../controller/userController');

const router = express.Router();

//register User

router.route('/register').post(registerUser);

//login Users

router.route('/login').post(loginUser);

router.route('/users').get(getAllUsers);

module.exports = router;
