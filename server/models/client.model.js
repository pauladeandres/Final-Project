const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String
    },
    secondName: {
        type: String
    },
    company: {
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
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const Client = mongoose.model("Client", clientSchema)

module.exports = Client