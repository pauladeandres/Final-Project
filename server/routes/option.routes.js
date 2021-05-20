const express = require('express')
const router = express.Router()
const { isLoggedIn, checkRoles } = require('../middlewares/index')
const Product = require('../models/product.model')
const Option = require('../models/option.model')
const mongoose = require('mongoose')
const { checkMongooseError } = require('./../utils')
const { findByIdAndUpdate } = require('../models/product.model')

router.get('/option/:option_id', (req, res) => {

    const { option_id } = req.params

    Option
        .findById(option_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))
})

router.delete('/delete/:option_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {
    const option_id = req.params.option_id

    Option
        .findByIdAndDelete(option_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))
})

router.post('/myarea/newoption/:product_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {

    const { product_id } = req.params

    const { price, color, stock, image } = req.body

    Option
        .create({ price, color, stock, image })
        .then(option => Product.findByIdAndUpdate(product_id, { $push: { options: option._id } }))
        .then(response => res.json(response))
        .catch(err => res.status(400).json({ code: 400, message: checkMongooseError(err) }))
})

router.put('/update-stock/:id', isLoggedIn, (req, res) => {

    Option
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => res.json(err))

})

module.exports = router