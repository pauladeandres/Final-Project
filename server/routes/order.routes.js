const express = require('express')
const router = express.Router()

const Order = require('../models/order.model')

// CREATE ORDER (POST)
router.post('/new', (req, res) => {

    const {product, quantity, option, customer} = req.body

    Order
        .findOne({$and: [{'customer':  customer}, {'paid': false}]})
        .then(order =>{
            if(order) {
                Order
                    .findOneAndUpdate({$and: [{'customer':  customer}, {'paid': false}]},{ $push: {products: {product, quantity, option}}})
                    .then(response => res.json(response))
                    .catch(err => res.status(500).json({ code: 500, message: 'Error while updating order', err }))
            } else {
                Order
                    .create({ customer, products : [{product, quantity, option}] })
                    .then(response => res.json(response))
                    .catch(err => res.status(500).json({ code: 500, message: 'Error while creating order', err }))
            }
        })
        .catch(err => res.status(500).json({ code: 500, message: 'Error with order', err }))
})

// CUSTOMER ORDER (GET)
router.get('/customer', (req, res) => {
    Order
        .find({'customer': req.session.currentUser._id}) 
        .populate('customer')
        .populate('products.product')
        .populate('products.option')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'No order to show', err }))
})

// REMOVE PRODUCT FROM CART (POST)
router.post('/remove/:id', (req, res) => {
    Order
        .findOneAndUpdate( { 'customer': req.session.currentUser._id }, { $pull: { products: { '_id': req.params.id } } } )
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not find any order', err }))
})

// EDIT PRODUCT QUANTITY FROM CART (POST)
router.post('/edit/:id', (req, res) => {

    const {quantity} = req.body

    console.log(req.body)

    console.log('customer:', req.session.currentUser._id, 'product id:', req.params.id, 'quantity', quantity)

    Order
        .findOneAndUpdate({$and: [{'customer': req.session.currentUser._id}, {'products._id': req.params.id}]}, {products: quantity})
})


module.exports = router