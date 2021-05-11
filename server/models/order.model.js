const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    products: [{ product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
        },
        quantity: {
            type: Number
        },
        option: {
        type: Schema.Types.ObjectId,
        ref: 'Option'
        }
    }],
    paid: {
        type: Boolean,
        default: false
    },
    sent: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order