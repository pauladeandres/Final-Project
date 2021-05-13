const express = require('express')
const router = express.Router()
const Order = require('../models/order.model')
const Product = require('../models/product.model')
const Client = require('./../models/client.model')
const User = require('./../models/user.model')

// Endpoints
router.get('/suppliers', (req, res) => {

    User
        .find({ role: 'SUPPLIER' })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching suppliers', err }))

})

router.get('/clients', (req, res) => {

    User
        .find({ role: 'CUSTOMER' })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching suppliers', err }))

})

router.get('/dashboard', (req, res) => {
    User
        .find()
        .then(response => console.log(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching clients', err }))
})

router.get('/orders', (req, res) => {
    Order
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching orders', err }))
})

router.get('/data', (req, res) => {
    let promise1 = getProducts()
    let promise2 = getOrders()

    Promise.all([promise1, promise2])
        .then(response => console.log('respuesta de promesa', response))
        .catch(err => console.log(err))
})


function getOrders() {
    Order
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
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching orders', err }))
}

function getProducts() {

    Product
        .find()
        .populate('options')
        .then(response => {
            console.log(response)
            let dataArray = response.map(elm => {
                let optArray = elm.options.length === 0 ? null :
                    elm.options.map(conf => ({ [conf.color]: conf.price }))

                let optArrayRed = optArray ? optArray.reduce((result, current) => Object.assign(result, current)) : {}
                console.log(Object.assign(optArrayRed, { name: elm.name }))
                return optArrayRed
            })
            return dataArray
        })
        .then(response => response)
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching orders', err }))

}





module.exports = router
