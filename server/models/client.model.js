const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    firstName: {
        type: String
    },
    secondName: {
        type: String
    },
    company: {
        type: String
    },
    vatNumber: {
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
}, {
    timestamps: true
})

const Client = mongoose.model("Client", clientSchema)

module.exports = Client