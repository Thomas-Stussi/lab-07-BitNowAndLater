const sendEmail = require('./utils/email');
const User = require('./model/user');


module.exports = job => {
  
  const { id, email, buy, currentBtc } = job.data.notifyUser;
  console.log(currentBtc, 'currentBtc');
  return Promise.all([
    User.delete(id),
    sendEmail(
      email,
      'Its time to buy BTC!',
      `BTC is currently at ${currentBtc}, which is lower than ${buy}, your buy price.
    Go buy your BTC here http://coinbase.com`
    ).catch(console.log)
  ]);
  
};
