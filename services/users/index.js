const chalk = require('chalk');
const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (password, comparepassword, user) => {
    if (await bcrypt.compare(password, comparepassword)) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email
        },
        JWT_SECRET
      )

      const currentTime = Date();

      const responseData = await User.findByIdAndUpdate(
        user._id, { session: token, sessionTime: currentTime, sessionExpired: false }
      )

      console.log(chalk.green.inverse('Logged in Successfully!'));
      process.exit(1);;
    } else {
      console.log(chalk.red.inverse('Invalid email/password'));
      process.exit(1);;
    }
}

const registerUser = async (hashedPassword, email) => {
    const response = await User.create({
      email,
      password: hashedPassword
    })
    console.log(chalk.green.inverse('User Successfully Created!'));
    process.exit(1);
}

const logoutUser = async (user) => {
    const loginTime = user.sessionTime
    const currentTime = Date().now
    var a = moment(loginTime)
    var b = moment(currentTime)
    var diffDays = b.diff(a);
    var duration = diffDays / 1000
  
    const responseData = await User.findByIdAndUpdate(
      user._id, { session: '', sessionTime: currentTime, sessionExpired: true }
    )
  
    console.log(chalk.green.inverse('Successfully Logged out!'));
    console.log(chalk.blue.inverse('Session Details (Logs):'));
    console.log('User Duration inside system:', duration + "s");
    console.log('User Login Time:', loginTime);
    process.exit(1);
}


module.exports = {
    loginUser,
    registerUser,
    logoutUser
}