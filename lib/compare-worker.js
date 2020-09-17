const User = require('./model/user');
const fetch = require('node-fetch');

module.exports = async(job) => {
  const user = await User.findById(job.data.rowId);

  const btc = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot')
    .then(response => response.json());

  const usersBuyAmount = Number(user.buy.slice(1));
  return (Number(btc.data.amount) <= usersBuyAmount) ? { notifyUser: { ...user, currentBtc: `$${btc.data.amount}` } } : false;

};

