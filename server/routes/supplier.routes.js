const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')

// Endpoints
router.get('/newproduct', (req, res) => console.log(res))


router.post('/newproduct', (req, res) => {

    const { name, description } = req.body

    Product
        .create({ name, description })
        .then(response => console.log(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating product', err }))

})


module.exports = router
