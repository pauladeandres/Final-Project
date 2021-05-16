const express = require('express')
const router = express.Router()
const { isLoggedIn, checkRoles } = require('../middlewares/index')
const Order = require('../models/order.model')

// CREATE ORDER (POST)
router.post('/new', isLoggedIn, (req, res) => {

    const { product, quantity, option, customer } = req.body

    Order
        .findOne({ $and: [{ 'customer': customer }, { 'paid': false }] })
        .then(order => {
            if (order) {
                Order
                    .findOneAndUpdate({ $and: [{ 'customer': customer }, { 'paid': false }] }, { $push: { products: { product, quantity, option } } })
                    .then(response => res.json(response))
                    .catch(err => res.status(500).json({ code: 500, message: 'Error while updating order', err }))
            } else {
                Order
                    .create({ customer, products: [{ product, quantity, option }] })
                    .then(response => res.json(response))
                    .catch(err => res.status(500).json({ code: 500, message: 'Error while creating order', err }))
            }
        })
        .catch(err => res.status(500).json({ code: 500, message: 'Error with order', err }))
})

// UNPAID CUSTOMER ORDER (GET)
router.get('/customer', (req, res) => {
    Order
        .find({ $and: [{ 'customer': req.session.currentUser._id }, { 'paid': false }] })
        .populate('customer')
        .populate('products.product')
        .populate('products.option')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'No order to show', err }))
})

// PAID CUSTOMER ORDER (GET)
router.get('/customer/paid', (req, res) => {
    Order
        .find({ $and: [{ 'customer': req.session.currentUser._id }, { 'paid': true }] })
        .populate('customer')
        .populate('products.product')
        .populate('products.option')
        .sort({ createdAt: -1 })
        .limit(20)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'No order to show', err }))
})

// REMOVE PRODUCT FROM CART (POST)
router.post('/remove/:id', isLoggedIn, checkRoles('ADMIN', 'CUSTOMER'), (req, res) => {
    Order
        .findOneAndUpdate({ 'customer': req.session.currentUser._id }, { $pull: { products: { '_id': req.params.id } } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not find any order', err }))
})

// EDIT PRODUCT QUANTITY FROM CART (POST)
router.post('/edit/:id', isLoggedIn, checkRoles('ADMIN', 'CUSTOMER'), (req, res) => {

    const { quantity } = req.body

    Order
        .findOneAndUpdate({$and: [{'customer': req.session.currentUser._id}, {'products._id': req.params.id}]},  
        { "$set": {'products.$.quantity': quantity}}, {new: true})
        .then(response => res.json(response))
        .catch(err => {
            res.status(500).json({ code: 500, message: 'Could not update this order', err })})
        })


module.exports = router