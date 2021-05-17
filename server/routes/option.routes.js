const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')
const Option = require('../models/option.model')

const { isLoggedIn, checkRoles } = require('../middlewares/index')
const mongoose = require('mongoose')
const { checkMongooseError } = require('./../utils')

router.get('/option/:option_id', (req, res) => {

    const { option_id } = req.params

    Option
        .findById(option_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))
})

router.delete('/delete/:option_id', (req, res) => {
    console.log('Respuesta de back: req.params.option_id', req.params.option_id)
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
        .catch(err => {
            console.log(checkMongooseError(err))
            res.status(400).json({ code: 400, errorMessage: checkMongooseError(err) })
        })
})

module.exports = router