const express = require('express');
const app = express();
const User = require('../lib/model/user');

app.use(express.json());

app.post('/v1/btcnow', async(req, res, next) => {
     try {
        console.log(req.body.email)
        const data = await User.insert({
            email: req.body.email,
            buy: req.body.buy
        })
        res.json(`We will notify ${data.email} when BTC is less than ${data.buy}. Your ticket number is ${data.id}`)
    } catch (err){

        next(err)
    }
})





app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
