const { json } = require('express')
const express = require('express')
const router = express.Router()
const Order = require('../models/order.model')
const Product = require('../models/product.model')
const Option = require('../models/option.model')
const Category = require('../models/category.model')
const Client = require('./../models/client.model')
const User = require('./../models/user.model')
const { isLoggedIn, checkRoles } = require('./../middlewares/index')

// Endpoints
router.get('/suppliers', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    User
        .find({ role: 'SUPPLIER' })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching suppliers', err }))

})

router.get('/clients', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    User
        .find({ role: 'CUSTOMER' })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching suppliers', err }))

})

router.get('/dashboard', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    User
        .find()
        .then(response => console.log(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching clients', err }))
})

router.get('/orders', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    Order
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching orders', err }))
})

router.get('/data', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    let productPromise = getProducts()
    let ordersPromise = getOrders()
    let categoryPromise = getProductCategories()

    Promise.all([productPromise, ordersPromise, categoryPromise])
        .then(response => res.json({ products: response[0], orders: response[1], categories: response[2] }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching data', err }))
})


function getOrders() {
    return Order
        .find()
        .populate('products.product')
        .populate('products.option')
        .then(response => {
            let dataArray = response.map(elm => elm.products.map(products => {
                let name = products.product.name + " " + products.option.color
                return {
                    x: name,
                    y: products.quantity
                }
            }))
            return dataArray
        })
        .then(dataArray => {
            return (dataArray.map((elm, index) => (
                {
                    "id": index,
                    "color": "hsl(239, 70%, 50%)",
                    'data': elm
                })
            ))
        }
        )
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching orders data', err }))
}

function getProducts() {

    return Product
        .find()
        .populate('options')
        .then(response => {
            let dataArray = response.map(elm => {
                let optArray = elm.options.length === 0 ? null :
                    elm.options.map(conf => ({ [conf.color]: conf.stock }))

                let optArrayRed = optArray ? optArray.reduce((result, current) => Object.assign(result, current)) : {}

                return Object.assign(optArrayRed, { name: elm.name })
            })
            return dataArray
        })
        .then(response => response)
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching products data', err }))

}

function getProductCategories() {
    return Category
        .find()
        .then(categories => {
            const manyProducts = categories.map(cat =>
                Product
                    .find({ category: cat._id })
                    .populate('options')
                    .populate('category')
            )
            return Promise.all(manyProducts)
        }
        )
        .then(resp => {
            return (
                {
                    name: 'products',
                    children: resp.map(productsArray =>
                        productsArray.length === 0 ? null :
                            {
                                name: productsArray[0].category.name,
                                children: productsArray.map(product => getObjectData(product))
                            })
                        .filter(elm => elm !== null)
                }
            )
        })
        .then(response => response)
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching products data', err }))
}

function getObjectData(product) {
    const objectData = (
        {
            name: product.name,
            children: product.options.map(opt => ({
                name: opt.color,
                price: opt.price
            }))
        }
    )

    return objectData
}


function pyramidDataStructure() {

}

module.exports = router
