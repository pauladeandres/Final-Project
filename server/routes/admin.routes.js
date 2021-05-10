const express = require('express')
const Order = require('../models/order.model')
const router = express.Router()

const Client = require('./../models/client.model')
const User = require('./../models/user.model')

// Endpoints
router.get('/suppliers', (req, res) => {

    User
        .find({ role: 'SUPPLIER' })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching suppliers', err }))

})

router.get('/clients', (req, res) => {

    User
        .find({ role: 'CUSTOMER' })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching suppliers', err }))

})

router.get('/dashboard', (req, res) => {
    User
        .find()
        .then(response => console.log(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching clients', err }))
})

router.get('/orders', (req, res) => {
    Order
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching clients', err }))
})



module.exports = router
