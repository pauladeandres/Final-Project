const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    secondName: {
        type: String
    },
    address: {
        type: String
    },
    zipcode: {
        type: Number
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    favoriteProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const Customer = mongoose.model("Customer", customerSchema)

module.exports = Customer