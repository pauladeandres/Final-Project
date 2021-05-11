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
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'No order to show', err }))
})


module.exports = router