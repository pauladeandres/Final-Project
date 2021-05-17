const express = require('express')
const router = express.Router()
const Coupon = require('../models/coupon.model')
const Order = require('../models/order.model')

// CREATE A COUPON
router.post('/new', (req, res) => {

    const { name, value} = req.body

    Coupon
        .create({ name, value})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error while creating coupon', err }))
})

// GET ALL COUPONS
router.get('/all', (req, res) => {
    Coupon
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching coupons', err }))

})

// ADD COUPON TO ORDER
router.put('/add/:id', (req, res) => {
    Order
        .findOneAndUpdate({ $and: [{ 'customer': req.session.currentUser._id }, { 'paid': false }] }, {coupon: req.params.id})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error inserting coupons', err }))
})

module.exports = router