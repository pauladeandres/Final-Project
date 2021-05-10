const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supplierSchema = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    company: {
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
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    role: {
        type: String,
        enum: ['Customer', 'Admin', 'Supplier'],
        default: 'Supplier'
    }
})

const Supplier = mongoose.model("Supplier", supplierSchema)

module.exports = Supplier