const express = require('express')
const router = express.Router()

const Order = require('../models/order.model')

// CREATE ORDER (POST)
router.post('/', (req, res) => {

    const order = req.body

    Order
        .create(order)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving order', err }))
})

// CUSTOMER ORDER (GET)
router.get('/customer', (req, res) => {
    Order
        .find() // {customer: 'req.session.currentUser'}
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'No order to show', err }))
})


module.exports = router