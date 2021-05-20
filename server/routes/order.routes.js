const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middlewares/index')
const Order = require('../models/order.model')
const { checkMongooseError } = require('./../utils')

// CREATE ORDER (POST)
router.put('/new', isLoggedIn, (req, res) => {

    const { product, quantity, option, customer } = req.body

    if (quantity < 1) {
    res.status(500).json({ code: 500, message: 'Please add at least 1 item to your cart' })
    return
    }

    Order
        .findOneAndUpdate({ $and: [{ 'customer': customer }, { 'paid': false }] }, { $push: { products: { product, quantity, option } } }, {new: true, upsert: true })
        .then(response => res.json(response))
        .catch(err => { res.status(500).json({ code: 500, message: 'Could not create any order', err })})
})

// UNPAID CUSTOMER ORDER (GET)
router.get('/customer', isLoggedIn, (req, res) => {
    Order
        .find({ $and: [{ 'customer': req.session.currentUser._id }, { 'paid': false }] })
        .populate('customer products.product products.option coupon')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'No order to show', err }))
})

// PAID CUSTOMER ORDER (GET)
router.get('/customer/paid', isLoggedIn, (req, res) => {
    Order
        .find({ $and: [{ 'customer': req.session.currentUser._id }, { 'paid': true }] })
        .populate('customer products.product products.option coupon')
        .sort({ updatedAt: -1 })
        .limit(20)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'No order to show', err }))
})

// REMOVE PRODUCT FROM CART (POST)
router.put('/remove/:id', isLoggedIn, (req, res) => {

    Order
        .findOneAndUpdate({ $and: [{ 'customer': req.session.currentUser._id }, { 'paid': false }] }, { $pull: { products: { '_id': req.params.id } } }, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not find any order', err }))
})

// EDIT PRODUCT QUANTITY FROM CART (POST)
router.put('/edit/:id', isLoggedIn, (req, res) => {

    const { quantity } = req.body

    Order
        .findOneAndUpdate({$and: [{'customer': req.session.currentUser._id}, {'products._id': req.params.id}]},  
        { "$set": {'products.$.quantity': quantity}}, {new: true})
        .then(response => res.json(response))
        .catch(err => {
            res.status(500).json({ code: 500, message: 'Could not update this order', err })})
})

// GET LAST PAID ORDER ID
router.get('/lastorder', isLoggedIn, (req, res) => {
    Order
        .findOne({ $and: [{ 'customer': req.session.currentUser._id }, { 'paid': true }] }, {'_id': 1}, { sort: { 'createdAt' : -1 } } )
        .then(response => res.json(response))
        .catch(err => { res.status(500).json({ code: 500, message: 'Could not find any order', err })})
})

// MAKE ORDER AS PAID
router.put('/paid', isLoggedIn, (req, res) => {
    Order
        .findOneAndUpdate({ $and: [{ 'customer': req.session.currentUser._id }, { 'paid': false}] },{'paid': true})
        .then(response => res.json(response))
        .catch(err => {
            res.status(500).json({ code: 500, message: 'Could not update this order', err })})
})


module.exports = router