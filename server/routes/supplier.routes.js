const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')
const Category = require('./../models/category.model')
const Option = require('./../models/option.model')

// Endpoints

router.get('/')

router.get('/newproduct', (req, res) => console.log(res))


router.post('/newproduct', (req, res) => {
 
    const { name, description, category } = req.body

    Product
        .create({ name, description, category })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating product', err }))
})

router.post('/newproduct/:product_id/options', (req, res) => { 

    const { price, color, stock, image } = req.body

    Option
        .create({ price, color, stock, image })
        .then(option => Product.findByIdAndUpdate(product_id, {$push: { options: option._id}}))
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating product', err }))
})

//A FUTURO UNIR LOS FORMULARIOS DE PRODUCTO Y OPCIONES
    // router.post('/newproduct', (req, res) => { TODO
 
    // const { name, description, category, options } = req.body

    // Product
    //     .create({ name, description, category })
    //     .then(response => console.log(response))
    //     .catch(err => res.status(500).json({ code: 500, message: 'Error creating product', err }))

    // })

// PARA CREAR CATEGORIAS DESDE POSTMAN
// router.post('/products/createcategory', (req, res) => {

//     const { name } = req.body

//     Category
//         .create({ name })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))

// })

// PARA CREAR OPCIONES DESDE POSTMAN
router.post('/products/createoption', (req, res) => {

    const option = req.body

    Option
        .create(option)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error loading products', err }))

})

module.exports = router
