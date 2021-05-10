const express = require('express')
const router = express.Router()

const Product = require('./../models/product.model')

router.get('/products', (req,res) => {

    Product
        .find()
        .select('name supplier category options')
        .populate('category')
        .populate('supplier')
        .populate('options')
        .then(response => res.json(response))
        .catch(err => console.log('Error', err))
})

router.get('/products/detail/:product_id', (req,res) => {

    Product
        .findById(req.params.product_id)
        .populate('category')
        .populate('supplier')
        .populate('options')
        .then(response => res.json(response))
        .catch(err => console.log('Error', err))
})

router.get('/products/:category', (req, res) => {

    Product
        .find({category: req.params.category})
        .select('name supplier category options')
        .populate('category')
        .populate('supplier')
        .populate('options')
        .then(response => res.json(response))
        .catch(err => console.log('Error', err))

})

router.get('/products/:supplier', (req, res) => {

    Product
        .find({ supplier: req.params.supplier })
        .select('name supplier category options')
        .populate('category')
        .populate('supplier')
        .populate('options')
        .then(response => res.json(response))
        .catch(err => console.log('Error', err))

})