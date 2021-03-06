const User = require('./model/user');
const fetch = require('node-fetch');

module.exports = async() => {
  const notify = [];
  const data = await User.find();

  const btc = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot')
    .then(res => res.json());

  data.map(user => {
    const usersBuyAmount = Number(user.buy.slice(1));
    if(Number(btc.data.amount) <= usersBuyAmount) {
      return notify.push({ ...user, currentBtc: `$${btc.data.amount}` });
    }
  });

  return { notifyUsers: notify };
};
