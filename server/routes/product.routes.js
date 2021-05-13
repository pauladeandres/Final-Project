const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')
const Option = require('../models/option.model')

router.get('/', (req, res) => {
    Product
        .find()
        .select('name supplier category options')
        // .populate('category')
        // .populate('supplier')
        .populate('options')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))
})

router.get('/:product_id', (req, res) => {
    Product
        .findById(req.params.product_id)
        .populate('options')
        .populate('category')
        // .populate('supplier')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading product', err }))
})

router.delete('/delete/:product_id', (req, res) => {
    Product
        .findByIdAndDelete(req.params.product_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading product', err }))
})

router.get('/:category', (req, res) => {

    Product
        .find({ category: req.params.category })
        .select('name supplier category options')
        // .populate('category')
        // .populate('supplier')
        // .populate('options')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))

})

router.get('/:supplier', (req, res) => {

    Product
        .find({ supplier: req.params.supplier })
        .select('name supplier category options')
        // .populate('category')
        // .populate('supplier')
        .populate('options')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))

})

router.get('/option/:option_id', (req, res) => {

    const { option_id } = req.params

    Option
        .findById(option_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))
})

router.delete('/delete/:option_id', (req,res) => {

    const {option_id} = req.params

    Option
        .findByIdAndDelete(option_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))
})

module.exports = router
