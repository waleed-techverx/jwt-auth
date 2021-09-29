const User = require('../../model/User');
const helper = require('../../config/helper');
const userService = require('../../services/users');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');


const loginhandler = async (email, password) => {
  try {
    const user = await User.findOne({ email }).lean();
    await helper.checkValidUser(user)
    await userService.loginUser(password, user.password, user)
    
  } catch (error) {
    console.log(chalk.red.inverse(error.message));
    process.exit(1);
  }
}

const logouthandler = async (email) => {
    try {
      const user = await User.findOne({ email }).lean();
      await helper.checkValidUser(user)
      await userService.logoutUser(user)
  
    } catch (error) {
      console.log(chalk.red.inverse(error.message));
      process.exit(1);
    }
}

const registerhandler = async (email, password) => {
    
    await helper.checkValidCredentials(email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      await userService.registerUser(hashedPassword, email)
    } catch (error) {
      if (error.code === 11000) {
        console.log(chalk.red.inverse('email already in use'));
        process.exit(1);
      } else {
        console.log(chalk.red.inverse(error.message));
        process.exit(1);
      }
    }
  
}

module.exports = {
    loginhandler,
    logouthandler,
    registerhandler
}