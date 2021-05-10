const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    paid: {
        type: Boolean
    },
    sent: {
        type: Boolean
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order