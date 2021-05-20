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
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching suppliers', err }))

})

router.get('/clients', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    User
        .find({ role: 'CUSTOMER' })
        .populate('client')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching suppliers', err }))

})

router.get('/dashboard', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    User
        .find()
        .then(response => res.json(response))
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
    let pyramidPromise = getPyramid()

    Promise.all([productPromise, ordersPromise, categoryPromise, pyramidPromise])
        .then(response => {
            return res.json({
                products: response[0], orders: response[1],
                categories: response[2], orderPyramid: response[3]
            })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching data', err }))
})


function getOrders() {
    return Order
        .populateOrder()
        .then(response => {
            let dataArray = response.map(elm => {
                let coords = elm.products.map(products => {
                    let name = products.product ? products.product.name : "N/A"
                    let color = products.option.color ? products.option.color : 'N/A'
                    let nameColor = name + " " + color
                    return {
                        x: nameColor,
                        y: !products.quantity ? 0 : products.quantity
                    }
                }
                )
                return coords
            }
            )
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
                    .populate('options category')
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


function getPyramid() {
    return Order
        .populateOrder()
        .then(response => {
            let productsArray = response.map(order => order.products)

            let numProducts = productsArray.reduce((acc, element) => acc + element.length, 0)
            let totalQuantity = productsArray.flat().reduce((acc, element) => acc + element.quantity, 0)
            let totalCost = productsArray.flat().reduce((acc, element) => acc + element.quantity * element.option.price, 0)

            return pyramidDataStructure(totalCost, totalQuantity, numProducts, response.length)

        })
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching products data', err }))

}


function pyramidDataStructure(cost, quantity, productNum, orders) {
    return (
        [
            {
                id: 0,
                label: '€ Sold * 100',
                value: cost / 100
            },
            {
                id: 1,
                label: 'Quantity Sold',
                value: quantity
            },
            {
                id: 2,
                label: 'Number of products',
                value: productNum
            },
            {
                id: 3,
                label: 'Orders',
                value: orders
            }]
    )
}

module.exports = router
