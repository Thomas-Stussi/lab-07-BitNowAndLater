const sendEmail = require('./utils/email');
const User = require('./model/user');


module.exports = job => {
  
  return Promise.all(job.data.notifyUsers.map(user => {
    const { id, email, buy, currentBtc } = user;
    return Promise.all([
      User.delete(id),
      sendEmail(
        email,
        'Its time to buy BTC!',
        `BTC is currently at ${currentBtc}, which is lower than ${buy}, your buy price.
    Go buy your BTC here http://coinbase.com`
      ).catch(console.log)
    ]);
  }));
};
