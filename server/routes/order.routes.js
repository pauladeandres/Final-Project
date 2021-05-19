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
router.get('/customer', isLoggedIn, (req, res) => {
    Order
        .find({ $and: [{ 'customer': req.session.currentUser._id }, { 'paid': false }] })
        .populate('customer')
        .populate('products.product')
        .populate('products.option')
        .populate('coupon')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'No order to show', err }))
})

// PAID CUSTOMER ORDER (GET)
router.get('/customer/paid', isLoggedIn, (req, res) => {
    Order
        .find({ $and: [{ 'customer': req.session.currentUser._id }, { 'paid': true }] })
        .populate('customer')
        .populate('products.product')
        .populate('products.option')
        .populate('coupon')
        .sort({ updatedAt: -1 })
        .limit(20)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'No order to show', err }))
})

// REMOVE PRODUCT FROM CART (POST)
router.post('/remove/:id', isLoggedIn, (req, res) => {

    console.log('customer', req.session.currentUser._id, 'product_id', req.params.id)
    Order
        .findOneAndUpdate({ 'customer': req.session.currentUser._id }, { $pull: { products: { '_id': req.params.id } } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not find any order', err }))
})

// EDIT PRODUCT QUANTITY FROM CART (POST)
router.post('/edit/:id', isLoggedIn, (req, res) => {

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
        .catch(err => {
            res.status(500).json({ code: 500, message: 'Could not find any order', err })})

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