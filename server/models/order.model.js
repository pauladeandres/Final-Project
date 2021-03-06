const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: {
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
    },
    coupon: {
        type: Schema.Types.ObjectId,
        ref: 'Coupon'
    }
}, {
    timestamps: true
})

orderSchema.statics.populateOrder = function () {
    return this.find().populate('products.product').populate('products.option').populate('customer')
}

const Order = mongoose.model("Order", orderSchema)

module.exports = Order