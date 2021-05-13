const express = require('express')
const router = express.Router()
const { isLoggedIn, checkRoles } = require('../middlewares/index')
const Product = require('../models/product.model')
const User = require('../models/user.model')
const Category = require('./../models/category.model')
const Option = require('./../models/option.model')

// Endpoints

router.get('/', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {

    Category
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading categories', err }))
})

router.post('/myarea/:supplier_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {

    const { supplier, name, description, category } = req.body
    console.log({ supplier, name, description, category })

    Product
        .create({ supplier, name, description, category })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating product', err }))
})

router.get('/myarea/:supplier_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {

    const { supplier_id } = req.params

    User
        .findById(supplier_id)
        .populate('client')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating product', err }))

})

router.get('/myarea/myproducts/:supplier_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {

    const { supplier_id } = req.params

    Product
        .find({ supplier: supplier_id })
        .populate('supplier')
        .populate('category')
        .populate('options')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating product', err }))

})

router.get('/myarea/myproductdetails/:product_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {

    const { product_id } = req.params

    Product
        .findById(product_id)
        .populate('supplier')
        .populate('options')
        .populate('category')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading product', err }))

})

router.post('/myarea/newoption/:product_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {
    
    const {product_id} = req.params

    const { price, color, stock, image } = req.body

    Option
        .create({ price, color, stock, image })
        .then(option => Product.findByIdAndUpdate(product_id, { $push: { options: option._id } }))
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating product', err }))
})
// ELIMINAR!?
// PARA CREAR CATEGORIAS DESDE POSTMAN
// router.post('/products/createcategory', (req, res) => {

//     const { name } = req.body

//     Category
//         .create({ name })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))

// })

module.exports = router
