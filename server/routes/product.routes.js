const express = require('express')
const router = express.Router()
const { isLoggedIn, checkRoles } = require('../middlewares/index')
const Product = require('../models/product.model')
const User = require('../models/user.model')

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

router.delete('/delete/:product_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => { 

    Product
        .findByIdAndDelete(req.params.product_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting product', err }))
})

router.put('/edit/:product_id', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), (req, res) => {

    const { product_id } = req.params
    const {name, description, category} = req.body

    Product
        .findByIdAndUpdate(product_id, { name, description, category })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing product', err }))
})

router.get('/category/:category', (req, res) => {

    Product
        .find({ category: req.params.category })
        .select('name supplier category options')
        .populate('category')
        // .populate('supplier')
        .populate('options')
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

// ADD A PRODUCT TO FAVORITES
router.put('/favorite/add', isLoggedIn, (req, res) => {

    const { product_id } = req.body

    User
        .findByIdAndUpdate(req.session.currentUser._id, { $push: { favoriteProducts: product_id } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error adding this product to favorites', err }))
})

// REMOVE A PRODUCT FROM FAVORITES
router.put('/favorite/remove/:id', isLoggedIn, (req, res) => {

    User
        .findByIdAndUpdate(req.session.currentUser._id, { $pull: { favoriteProducts: req.params.id }})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error removing this product from favorites', err }))
})

// GET USER'S FAVORITE PRODUCTS
router.get('/favorite/myfavorite', isLoggedIn, (req, res) => {

    console.log(req.session.currentUser._id)

    User
        .findById(req.session.currentUser._id)
        .select('favoriteProducts')
        .populate('favoriteProducts')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading favorites', err }))
})

module.exports = router
