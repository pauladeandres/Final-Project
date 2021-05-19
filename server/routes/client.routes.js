const express = require('express')
const router = express.Router()

const { isLoggedIn, checkRoles } = require('../middlewares/index')
const Product = require('../models/product.model')
const User = require('../models/user.model')
const Category = require('./../models/category.model')
const Option = require('./../models/option.model')
const Client = require('../models/client.model')

const mongoose = require('mongoose')
const { checkMongooseError } = require('./../utils')

// GET ALL CATEGORIES
router.get('/', (req, res) => {

    Category
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading categories', err }))
})

// CREATING PRODUCT
router.post('/myarea/:supplier_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {

    const { supplier, name, description, category } = req.body
    console.log({ supplier, name, description, category })

    Product
        .create({ supplier, name, description, category })
        .then(response => res.json('Product created'))
        .catch(err => {
            console.log(checkMongooseError(err))
            res.status(400).json({ code: 400, message: checkMongooseError(err) })
        })
})

// GET SUPPLIER DETAILS
router.get('/myarea/:supplier_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {

    const { supplier_id } = req.params
    console.log(supplier_id)
    User
        .findById(supplier_id)
        .populate('client')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating product', err }))

})

// GET SUPPLIER'S PRODUCTS
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

// GET SUPPLIER'S PRODUCTS DETAILS
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

//DELETE CLIENT
router.delete('/delete/:client_id', (req, res) => {

    Client
        .findByIdAndDelete(req.params.client_id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ code: 400, message: 'Error eliminating client', err }))
})

// GETTING CLIENT DETAILS
router.get('/clientdetails/:id', isLoggedIn, (req, res) => {

    Client
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not find any user', err }))
})

// UPDATING CLIENT DETAILS
router.put('/client/:id', isLoggedIn, (req, res) => {
    const client = req.body
    const client_id = req.params.id

    if (client.firstName.length === 0 || client.secondName.length === 0 || client.address.length === 0 || client.zipcode.length === 0 || client.city.length === 0 || client.country.length === 0 || client.phone.length === 0) {
        res.status(500).json({ code: 500, message: 'Please fill all the fields' })
        return 
    }

    Client
        .findByIdAndUpdate(client_id, client, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not find any user', err }))
})

// CREATE NEW CLIENT (POST)
router.post('/new', isLoggedIn, (req, res) => {

    const _id = req.session.currentUser._id

    const { firstName, secondName, company, address, zipcode, city, country, phone } = req.body

    Client
        .create({ firstName, secondName, company, address, zipcode, city, country, phone })
        .then(response => {
            User
                .findByIdAndUpdate(_id, { client: response._id }, { new: true })
                .then(user => console.log(user))
                .catch(err => console.log(err))
        })
        .then(response => res.json(response))
        .catch(err => res.status(400).json({ code: 400, message: checkMongooseError(err) }))
})

// ADD ORDER TO CLIENT
router.put('/add-order', isLoggedIn, (req, res) => {

    const {order_id, client_id} = req.body

    Client
        .findByIdAndUpdate(client_id, { $push: { order: order_id } }, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not insert this order', err }))
})

module.exports = router
