const chalk = require('chalk');

const checkValidCredentials = async (email, password) => {
    if (!email || typeof email !== 'string') {
      console.log(chalk.red.inverse('Invalid email!'));
      process.exit(1);
    }
    if (!password || typeof password !== 'string') {
      console.log(chalk.red.inverse('Invalid Password!'));
      process.exit(1);
    }
    if (password.length < 5) {
      console.log(chalk.red.inverse('Password too small. Should be atleast 6 characters'));
      process.exit(1);
    }
  
}

const checkValidUser = async (user) => {
    if (!user) {
      console.log(chalk.red.inverse('Invalid email/password'));
      process.exit(1);;
    }
 
}


module.exports = {
    checkValidCredentials,
    checkValidUser
}