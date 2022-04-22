const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SERVER_KEY);

// payment
router.post('/payment/create-payment-intent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        const clientSecret = paymentIntent.client_secret;
        console.log(clientSecret);

        return res.status(200).json({ clientSecret: clientSecret });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


module.exports = router;