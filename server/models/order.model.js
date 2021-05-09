const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order