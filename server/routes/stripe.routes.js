const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middlewares/index')
const stripe = require("stripe")("sk_test_51Is8adJE4qSE89JMIRP4tP4ssXIRuFPrSBapAMtFPQJKiEogPaIwPHUFKFDL9a6OqlUPAUAzZEX2FUlLYN815BbO00OYyLy4GH")

router.post('/create-payment-intent', isLoggedIn, async (req, res) => {

    const {total, orderId} = req.body

    const paymentIntent = await stripe.paymentIntents.create({
    amount: total*100,
    currency: "usd",
    description: orderId
  });

  res.send({
      clientSecret: paymentIntent.client_secret,
  })
})

module.exports = router